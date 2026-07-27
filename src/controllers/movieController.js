import {prisma} from "../config/db.js";

const addToMovieDB = async (req, res ) => {
    try {
        const {title,overview,releaseYear,genres,runtime,posterUrl} = req.body;

        const movie = await prisma.movie.create({
            data: 
            {
            title,
            overview,
            releaseYear,
            genres,
            runtime,
            posterUrl,
            createdBy : req.user.id
            },
        })
        res.status(200).json({ Status: movie });
    } catch (error){
        
        res.status(500).json({ Status: `Movie adding issue: ${error}` });
    }

    

}

export {addToMovieDB}