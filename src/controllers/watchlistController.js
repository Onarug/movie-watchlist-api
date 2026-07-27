import {prisma} from "../config/db.js";


const addToWatchlist = async (req,res) => {
    const {movieId,movieStatus,rating,notes} = req.body;
    
    // First Verify movie Exists
    const movie = await prisma.movie.findUnique({
        where : {id : movieId},
    });

    if(!movie){
        return res.status(404).json({
            error: "Movie not found"
        });
    }

    // Check if exitists in watchlist
    const movieUnique = await prisma.watchlistItem.findUnique({
        where : {movieId_userId: {
                movieId: movieId,    
                userId: req.user.id,
                
            }
        },
    });

    if(movieUnique){
        return res.status(400).json({
            error: "Movie Exisits in watchlist already"
        });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data:{
            userId : req.user.id,
            movieId,
            status: movieStatus || "PLANNED",
            rating,
            notes,
        }
  
    });

    res.status(200).json({
        data: {
            watchlistItem
        },
    });
};

const removeFromWatchList = async (req,res) =>{

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: {id : req.params.id},
    });

    if(!watchlistItem){
        return res.status(404).json({
            error: "Watchlist item not found"
        });
    }

    if(watchlistItem.userId !== req.user.id){
        return res.status(402).json({
            error: "Not permitted to update this item"
        });
    }

    await prisma.watchlistItem.delete({
        where: { id: req.params.id},
    });

    res.status(200).json({
        status : "Movie removed from watchlist"
    })
}

const updateWatchlist = async (req,res) => {

    const {movieStatus,rating,notes} = req.body;

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: {id : req.params.id},
    });

        if(!watchlistItem){
        return res.status(404).json({
            error: "Watchlist item not found"
        });
    }

    if(watchlistItem.userId !== req.user.id){
        return res.status(402).json({
            error: "Not permitted to update this item"
        });
    }

    const updated = await prisma.watchlistItem.update({
        where : {
            id : req.params.id
        },
        data : {
            status : movieStatus,
            rating,
            notes
        }
    });

    
    res.status(200).json({
        data: {
            updated
        },
    })
 

}

export {addToWatchlist,removeFromWatchList,updateWatchlist}