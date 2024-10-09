
import axios from 'axios';

export const getAnimationInfo = async (req, res) => {
    try {
        const {page, pageSize} = req.query
        const animationInfo = await axios.get('https://recorder.justsigns.co/api/animation/info', {
            params: {
                page: page, 
                pageSize: pageSize
            }
        });

        if (!animationInfo.data.data || animationInfo.data.data.length === 0) {
            return res.status(404).json({ message: "Animation information not found" });
        }

        res.status(200).json(animationInfo.data);
      
    } catch (err) {

        console.error("Failed to fetch animation info.", err);
        res.status(500).json({ error: "Failed to fetch animation info" });
    }
}

export const getAnimationClip = async (req, res) => {
    try {
        const {id} = req.params;
        const animationClip = await axios.get(`https://recorder.justsigns.co/api/animation/clip/${id}`);

        res.status(200).json(animationClip.data);

    } catch (err) {
        console.error("Failed to fetch animation clip.", err);
        res.status(500).json({ error: "Failed to fetch animation clip" });
    }
}