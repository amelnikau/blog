const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const should = chai.should();
chai.use(sinonChai);

const blogModel = require("../../src/models/blog_model");
let blogController;

describe("Blog controller testing", function () {
    let findModelStub;
    let findByIdModelStub;

    before(function () {
        findModelStub = sinon.stub(blogModel, "find").callsFake(() => {
            return {
                exec: sinon.stub().resolves({
                    anyValue: true
                })
            };
        });

        findByIdModelStub = sinon.stub(blogModel, "findById").callsFake(() => {
            return {
                exec: sinon.stub().resolves({
                    anyValue: true
                })
            };
        });

        findByIdModelStub.withArgs(-1).returns({
            exec: sinon.stub().resolves(undefined)
        });

        blogController = proxyquire("../../src/controllers/blog_controller", {
            blog_model: blogModel
        });

    });

    after(function () {
        findModelStub.restore();
        findByIdModelStub.restore();
    });

    context("Get all blogs", function () {
        it("Should return all blogs", function (done) {
            blogController.getAllBlogs().then(_ => {
                findModelStub.should.have.been.calledOnce;
                done();
            }).catch(error => done(error));
        });
    });

    context("Get blog by id", function () {
        it("Should return blog by id", function (done) {
            blogController.getBlogById(100).then(_ => {
                findByIdModelStub.should.have.been.calledOnce;
                done();
            }).catch(error => done(error));
        });

        it("Should throw error for unknown id", function (done) {
            blogController.getBlogById(-1).catch(
                error => {
                    error.should.have.property('message', 'No blog with id -1 found');
                    done()
                });
        });
    });
});
