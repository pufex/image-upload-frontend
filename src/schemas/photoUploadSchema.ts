import {z} from "zod"

export const photoUploadSchema = z.object({
    photo: z.union([
        z.instanceof(FileList)
            .refine((fileList) => !fileList[0] || fileList[0].size !== 0 || fileList[0].size <= 5000000, {message:"Max size exceeded"}),
        z.string().optional()
    ])
})