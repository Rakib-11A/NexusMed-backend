import z from "zod";

export const updateAdminZodSchema = z.object({
    admin: z.object({
        name: z.string("Name must be a string.").optional(),
        profilePhoto: z.string("Profile photo must be a valid URL").optional(),
        contactNumber: z.string("Contact number must be a string.").min(11, "Contact number must be at least 11 character.").max(14, "Contact number must be at most 14 character.").optional(),
    }).optional()
})