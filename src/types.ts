export type GalleryPhoto = {
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