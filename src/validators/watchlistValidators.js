import z, { object } from 'zod'

const addToWatchlistSchema = z.object({
    movieId : z.string().uuid(),
    status : z.enum([
         "PLANNED",
        "WATCHING",
        "FINISHED",
        "DROPPED"
    ], {
        error : () => {
            message : "Staus not the correct enum"
        }
    }).optional(),
    rating : z.coerce.number().int("Rating must be an interger").min(1).max(10).optional(),
    notes: z.string().optional()
});

const updateWatchlistSchema = z.object({
        status : z.enum([
         "PLANNED",
        "WATCHING",
        "FINISHED",
        "DROPPED"
    ], {
        error : () => {
            message : "Staus not the correct enum"
        }
    }).optional(),
    rating : z.coerce.number().int("Rating must be an interger").min(1).max(10).optional(),
    notes: z.string().optional()
})


export {addToWatchlistSchema,updateWatchlistSchema}