const About=require('../models/about')
const Page=require('../models/pages')

const addAbout = async (req, res) => {
    try {
        const getPage=await Page.findOne({title:'About us'})
        console.log(getPage)
        if(getPage){
            const addAbout=new About({
                page:getPage._id,
                question:req.body.question,
                answer:req.body.answer,
                title:getPage.title,
                description:getPage.description,
                image:req.file.path
            })
            await addAbout.save()

        }
        

        // Upload image to Cloudinary
        // const cloudinaryResponse = await cloudinary.uploader.upload(image.path);

        // // Map over the content array and upload images for each item
        // const updatedContent = await Promise.all(content.map(async (item) => {
        //     const imageResponse = await cloudinary.uploader.upload(item.image.path);
        //     return {
        //         question: item.question,
        //         answer: item.answer,
        //         image: imageResponse.secure_url
        //     };
        // }));

        // // Create new About document with updated content
        // const newAbout = new About({
        //     title,
        //     description,
        //     content: updatedContent
        // });

        // // Save About document to database
        // const savedAbout = await newAbout.save();

        res.status(201).json(addAbout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = addAbout;