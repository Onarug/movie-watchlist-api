import { includes } from "zod";
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

const showMovieDB = async(req,res) => {
    try {
        const allMovies = await prisma.movie.findMany();

        return res.status(200).json({
            data: {allMovies}
        });

    } catch(error) {
        return res.status(500).json({
            message : `Error: ${error}`
        });
    }

}

const getMovieById = async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
            
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.status(200).json({
            data: { movie }
        });
    } catch (error) {
        return res.status(500).json({
            message : `Error: ${error}`
        });
    }
};


export {addToMovieDB,showMovieDB, getMovieById}