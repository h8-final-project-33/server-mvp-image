const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('Image Test', function() {
    let _id = null

    let newImage = {
        featured_image : 'http://image.com',
        description : ['house', 'door']
    }

    describe('POST - Success', function() {
        describe('/images', function() {
            it('should send an object with status code 201', function(done) {
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
                    expect(res.body.featured_image).to.equal(newImage.featured_image)
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
                    expect(res.body[0].featured_image).to.equal(newImage.featured_image)
                    done()
                })
            })
        })
    })

    describe('PATCH - Success', function() {
        describe('/images - Change the value', function() {
            it('should send an object with status code 200', function(done) {
                chai.request(app)
                .patch('/images' + `/${_id}`)
                .send({
                    featured_image: 'http://test-image.com'
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
    
        describe('/images - Without change the value', function() {
            it('should send an object with status code 200', function(done) {
                chai.request(app)
                .patch('/images' + `/${_id}`)
                .send({
                    featured_image: 'http://test-image.com'
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
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
        })
    })
})