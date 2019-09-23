require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const fs = require('fs')
let base64img = fs.readFileSync('./test/base64.txt','utf8')

chai.use(chaiHttp)

describe('Image Test', function() {
    let _id = null

    let newImage = {
        image : base64img,
        _id: "5d85a0d113c6a18483e0833c",
    }

    describe('POST - Success', function() {
        describe('/images', function() {
            this.timeout(100000)
            it('should send an object with status code 201', (done) => {
                chai.request(app)
                .post('/images')
                .send(newImage)
                .end(function(err, res) {
                    _id = res.body._id
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('featured_image')
                    done()
                })
            })
        })
    })

    describe('GET - Success', function() {
        describe('/images', function() {
            it('should send an array of objects with status code 200', function(done) {
                chai.request(app)
                .get('/images')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('Object')
                    expect(res.body[0]).to.have.property('_id')
                    expect(res.body[0]).to.have.property('featured_image')
                    done()
                })
            })
        })
    })

    describe('GET DETAIL - Success', function() {
        describe('/images/:id', function() {
            it('should send an array of objects with status code 200', function(done) {
                chai.request(app)
                .get('/images/'+_id)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('Object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('featured_image')
                    done()
                })
            })

            it('should not get detail an object of undefined', function(done) {
                chai.request(app)
                .get('/images/5d876601e54e370e3b3f948b')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
    })


    describe('GET MY IMAGE - Success', function() {
        it('should get image of owner', function(done) {
            chai.request(app)
            .get('/images/find/myImage')
            .send({owner:"5d85a0d113c6a18483e0833c" })
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('Object')
                done()
            })
        })
    })


    describe('DELETE - Success', function() {
        describe('/images', function() {
            it('should send an object with status code 200', function(done) {
                chai.request(app)
                .delete('/images' + `/${_id}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })

            it('should not delete an object of undefined', function(done) {
                chai.request(app)
                .delete('/images/5d876601e54e370e3b3f948b')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
    })
})