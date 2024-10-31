import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const PhoneParams = z.object({
    title: z
        .string({ required_error: "Title is required." }),
    description: z.string({
        required_error: "Description is required.",
    }),
    iphoneLink: z.string({
        required_error: "iPhone Link is required is required.",
    }),
    androidLink: z.string({
        required_error: "Android link is required.",
    }),
});

export const PhoneParamsSchema = toFormikValidationSchema(PhoneParams);
export type PhoneParamsType = z.infer<typeof PhoneParams>;