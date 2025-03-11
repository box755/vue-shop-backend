// post orm 的controller，處理post表操作邏輯
const Post = require('../models/main.js').Post //取得post表ORM

// 非同步，產生promise物件
exports.create = async (req, res) => {
    try{
        const {title, content} = req.body
        if(!title || !content){
            return res.status(400).send({
                message: 'Must set a title and content.'
            })
        }
        await Post.create(req.body)
        res.status(201).send({
            message: 'Post successfully created',
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).send({message: "internal server error!"})
    }
}

exports.findAllPosts = async (req, res) => {
    try{
        const posts = await Post.findAll()
        if(posts.length <= 0){
            return res.status(404).send({message: 'No posts found.'})
        }
        res.status(200).send(posts)
    }catch (error){
        console.log(error)
        res.status(400).send({message: "internal server error!"})
    }
}

exports.findOnePost = async (req, res) => {
    try{
        const post = await Post.findOne()
        if(!post){
            return res.status(404).send({message: 'No posts found.'})
        }
        res.status(200).send(post)
    }catch (error){
        console.log(error)
        res.status(400).send({message: "internal server error!"})
    }
}

exports.findPostById = async (req, res) => {
    try{
        console.log(req.params.id)
        const post = await Post.findByPk(req.params.id)
        if(!post){
            return res.status(404).send({message: 'No posts found.'})
        }
        res.status(200).send(post)
    }catch (error){
        console.log(error)
        res.status(400).send({message: "internal server error!"})
    }
}


