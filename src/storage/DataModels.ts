export interface UniqueUser {
    user_id: string,
    user_handle: string,
    role: "human" | "bot",
    call_count: number
}

export interface UserLanguageChoice {
    user_id: string,
    language: string,
}