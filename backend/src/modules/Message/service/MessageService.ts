import { prismaConnection } from "../../../PrismaConnection";
class MessageService {
  public async create(senderId, receiverId, content){
    const newMessage = await prismaConnection.message.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        content: content,
      },
      include: {
        receiver: true,
        sender: true,
      }
    });
    return newMessage;
  }

}

export const messageService = new MessageService();