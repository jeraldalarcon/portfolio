export interface User {

    success: {
        token: string,
        user: {
            id: number,
            nam: string,
            email: string,
            email_verified_at: string,
            password: string,
            role : number,
        }
    }
}
