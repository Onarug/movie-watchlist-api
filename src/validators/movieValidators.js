import z from "zod"

const addToMovieDBSchema = z.object({
    
            title : z.string(),
            overview : z.string(),
            releaseYear : z.int().min(1800).max(2037),
            genres : z.array(z.string()),
            runtime : z.int().max(300),
            posterUrl : z.union([z.string().url(),z.literal("")]),
            
            
})

export {addToMovieDBSchema}