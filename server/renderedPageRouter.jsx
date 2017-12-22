import React from 'react';
import {renderToString } from 'react-dom/server.js';
import {match, RouterContext } from 'react-router';

import Router from 'express';

//import HelloWorld from '../static/src/HelloWorld.jsx';
import template from './template.js';
import routes from '../static/src/Routes.jsx';
import ContextWrapper from '../static/src/ContextWrapper.jsx';

const renderedPageRouter = new Router();


renderedPageRouter.get('*', (req, res) =>{
  match({routes, location: req.url}, (error, redirectLocation, renderProps) =>{
    if(error){
      console.log(" there is an error here : ", error);
      res.status(500).send(error.message);
    } else if(redirectLocation){
      console.log(" there is the redirectLocation here : ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if(renderProps){
      const componentsWithData = renderProps.components.filter(c=> c.dataFetcher);
      console.log("***** componentsWithData : ", renderProps);
      const dataFetchers = componentsWithData.map(c=> c.dataFetcher({
        params: renderProps.params,
        location: renderProps.location,
        urlBase : 'http://localhost:3000'
      }));
      Promise.all(dataFetchers).then((dataList)=>{
        let initialState ={};
        dataList.forEach((namedData)=>{
          initialState = Object.assign(initialState, namedData);
        });


        const html = renderToString(
          <ContextWrapper initialState={initialState} >
            <RouterContext {...renderProps} />
          </ContextWrapper>
        );
        res.status(200).send(template(html, initialState));
      }).catch(err=>{
        console.log(`Error rendering to string : ${err}`);
      });
    }else {
      res.status(404).send('Not Found');
    }
  });
  // const initialState = {addressee: 'Universe'};
  // const html = renderToString(<HelloWorld {...initialState} />);
  // res.send(template(html, initialState));
});
export default renderedPageRouter;
