var expect  = require('chai').expect;
var request = require('request');
const assert = require ('assert');
var chai = require('chai')
, chaiHttp = require('chai-http');
chai.use(chaiHttp);




describe('login and signup', function() {
    describe ('login', function() {
           const userdata=
            {
                username: "xindama",
                password: "xxxmmm",
                 withCredentials: true,
            }
            it('loggedin successfully!', function() {
            chai.request('http://localhost:4000/login')         
                .post("/login")
                .send(userdata)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body).toStrictEqual("created");
                 });
                
            });
        });

    describe ('signup', function(done) {
        const signupdata=
            {
                 username: "xindama",
                 email: "xindama@gmail.com",
                 password: "xxxmmm",
                 confirmpassword: "xxxmmm",
                  withCredentials: true,
            }
            it('loggedin successfully!', function() {
                chai.request('http://localhost:4000/login')         
                 .post("/newuser")
                 .send(signupdata)
                 .end(function (err, res) {
                     expect(res.body).toStrictEqual("created");
                  });
                 
             });
        });
});

describe('accesshomepage', function() {
    describe ('getdatahomepage', function(done) {
        it('getalldata', function() {
            chai.request('/')
            .get('/api_whatsnew')
            .end(function(err,res){
                expect(res).to.have.status(200);
                })  

        })
    })
})

describe('accesspostdetialpage', function() {
    describe ('postpostdetail', function(done) {
        it('postbrowseddata', function() {
            chai.request('/detailpost')
            .post("/browsed")
            .end(function(err,res){
                expect(res).to.have.status(200);
                })  

        })
    })
})
