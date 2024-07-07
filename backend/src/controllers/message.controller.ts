import prismaConnection from "../PrismaConnection";
import { Request, Response } from "express";
class MessageController {
  public async sendMessage(req: Request, res: Response){
    try {
      const { message, senderId } = req.body;
      const { id:receiverId } = req.params;

      // achar conversa
      let chat = await prismaConnection.chat.findFirst({
        where: {
          participants: {
            every: {
              AND: [
                {
                  id: {
                    equals: senderId
                  }
                },
                {
                  id: {
                    equals: receiverId
                  }
                }
              ]
            }
          }
        }
      })

      if (!chat) {
        // caso a conversa nao exista
        chat = await prismaConnection.chat.create({
          data: {
            // participantsIds: {
            //   // "set" cria um novo array com os item utilizados (diferente de "push", que atualiza)
            //   set: [senderId, receiverId] 
            // }
            participants: {
              connect: [
                { id: senderId },
                { id: receiverId }
              ]

            }
          }
        })
      }

      const newMessage = await prismaConnection.message.create({
        data: {
          content: message,
          chatId: chat.id,
          senderId: senderId,
        },
        include: {
          chat: true,
        }
      })

      // registrar mensagem no chat
      chat = await prismaConnection.chat.update({
        where: { id: chat.id },
        data: {
          // make connection
          messages: {
            connect: {
              id: newMessage.id
            }
          }
        }
      })

      return res.json(newMessage);
      // enviar mensagem no socket

      
    } catch (error) {
      console.log("Error in sendMessage:" + error.message);
      res.status(500).json({error: "Internal server error"})
      
    }


    // const newMessage = await prismaConnection.message.create({
    //   data: {
    //     senderId: senderId,
    //     receiverId: receiverId,
    //     content: content,
    //   },
    //   include: {
    //     receiver: true,
    //     sender: true,
    //   }
    // });
    // return newMessage;
  }

}

export const messageController = new MessageController();