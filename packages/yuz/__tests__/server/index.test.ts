import 'mocha';
import path from 'path';
import fs from 'fs';
import should from 'should';
import supertest from 'supertest';
import chai from 'chai';

import nextBuild from 'next/dist/build';
import { ThemeServer } from '../../src/server';
import { removeFullDir } from '../../src/util/file';
import { TypeServerRequest } from '../../src/types';


describe('src/server/index', function () {

  it('server.ThemeServer', function (done) {
    this.timeout(60000 * 1);
    const themeServer = new ThemeServer({ 
      port: 3000,
      apiHandler: async (request: TypeServerRequest) => {
        const result = {
          success: true,
          data: request.path,
          code: 'SUCCESS',
          message: 'success!',
        };
        return result;
      }
    });

    themeServer.getServerAppAsync().then((app: any) => {
      const request = supertest(app.listen());
      request
      .get('/api/hello')
      .expect(200)
      .end(( err, res ) => {
        if (err) {
          return done(err);
        }
        should(res.body).be.deepEqual({"success":true,"data":"/api/hello","code":"SUCCESS","message":"success!"});
        done();
      });
    }).catch((err: Error) => {
      console.log(err);
      done(err);
    });

  });
});



