export interface Message {
    id: string;
    author: string;
    message: string;
}

export interface MessageMutation {
    author: string;
    message: string;
    image: File | null;
}