const express = require("express");
const axios = require('axios')
const router = express.Router();


//@route GET api/duck
//@desc  get all post
//access Public


const getDataFromApi = async (text) => {
  try {
    const data = await axios.get(`http://api.duckduckgo.com/?q=${text}&format=json`)
    const arrayOfResults = (data.data.RelatedTopics);
    let myListOfResults = []

    arrayOfResults.map(item => {
      if (item.FirstURL !== undefined) {
        myListOfResults.push({
          link: item.FirstURL,
          name: item.Text
        })
      } else {
        item.Topics.map(topic => {
          myListOfResults.push({
            link: topic.FirstURL,
            name: topic.Text
          })
        })
      }
    })
    return myListOfResults
  } catch (error) {
    return error
  }
}

router.get('/:text', async (req, res) => {
  const searchText = req.params.text;
  try {
    const dataR = await getDataFromApi(searchText)
    res.status(200).send(dataR)
  } catch (error) {
    res.status(404).json({ nopostsfound: "no posts found" })

  }

})

module.exports = router;