import {Express, Request, Response} from 'express';
import { addMovieDetails, queryAllMovies, queryMoviesForList, queryMovieById, filterMovies } from './db/database';

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
                res.send(err);
            });
   });
   
   app.get('/movie/all', (req : Request, res : Response) => {
       queryAllMovies()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
   });
   
   app.get('/movie/list', (req : Request, res : Response) => {
       queryMoviesForList()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
   });
   
   app.get('/movie/filter/:filter', (req : Request, res : Response) => {
       filterMovies(req.params.filter)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
   });
   
   app.get('/movie/:id', (req : Request, res : Response) => {
       queryMovieById(req.params.id)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
   });
}