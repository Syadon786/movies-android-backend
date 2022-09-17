import {Express, Request, Response} from 'express';
import { addMovieDetails, queryAllMovies, queryMoviesForList, queryMovieById, filterMovies } from './db/database';
import logger from './logger';

export default function (app : Express) {
   app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

   app.get('/addmovie', (req : Request, res : Response) => {
        res.render('addmovie', {});
    });
   
   app.post('/addmovie', (req : Request, res : Response) => {
        addMovieDetails(req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.status(400).send(`Could not insert the new movie to the database.`);
            });
   });
   
   app.get('/movie/all', (req : Request, res : Response) => {
       queryAllMovies()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.status(404).send(`Could not found any movie in the database.`);
            });
   });
   
   app.get('/movie/list', (req : Request, res : Response) => {
       queryMoviesForList()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.status(404).send(`Could not found any movie in the database.`);
            });
   });
   
   app.get('/movie/filter/:filter', (req : Request, res : Response) => {
       filterMovies(req.params.filter)
            .then((result) => {
                if(result.length) {
                    res.send(result);
                }
                else {
                    res.status(404).send(`No movie found with specified filters.`);
                }
            })
            .catch((err) => {
                res.status(404).send(`No movie found with specified filters.`);
            });
   });
   
   app.get('/movie/:id', (req : Request, res : Response) => {
       queryMovieById(req.params.id)
            .then((result) => {
                if(result.length) {
                    res.send(result);                 
                }
                else {
                    res.status(404).send(`Movie with id ${req.params.id} not found.`); 
                }
            })
            .catch((err) => {
                res.status(404).send(`Movie with id ${req.params.id} not found.`);
            });
   });
}