export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  isMine: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyImage?: string;
  propertyPrice?: number;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
