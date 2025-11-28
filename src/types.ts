export type DeclarationsCount = {
    declarationsCount: number
}

export type GalleryPhoto = {
    loading: boolean,
    error: string,
    image_id: string,
    data: string,
}

export type ImageDeclaration = {
    _id: string,
    chunksAmount: number,
    size: number,
    createdAt: Date,
    updatedAt: Date
}

export type ImageChunk = {
    _id: string,
    image_id: string,
    chunksNumber: number,
    data: string,
    createdAt: Date,
    updatedAt: Date
}

export type UserType = {
    _id: string,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}

export type AuthObject = {
    user: UserType,
    accessToken: string
}