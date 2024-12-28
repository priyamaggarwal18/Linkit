import Links from "../models/links.js";

// create a new link
export const createLink = async (req, res) => {
  try {
    const { title, link } = req.body;
    const userId = req.user.id;

    if (!title || !link) {
      return res.status(400).json({ message: "title and link are required" });
    }

    const newLink = new Links({ title, link, userId });
    await newLink.save();

    res.status(201).json(newLink);
  } catch (error) {
    console.error("error creating link:", error);
    res.status(500).json({ message: "server error during link creation" });
  }
};

// get all links for the authenticated user
export const getUserLinks = async (req, res) => {
  try {
    const links = await Links.find({ userId: req.user.id });

    if (!links || links.length === 0) {
      return res.status(404).json({ message: "no links found for the user" });
    }

    res.json(links);
  } catch (error) {
    console.error("error fetching user links:", error);
    res.status(500).json({ message: "server error while fetching links" });
  }
};

// delete a specific link
export const deleteLink = async (req, res) => {
  try {
    const linkId = req.params.id;
    const userId = req.user.id;

    if (!linkId) {
      return res.status(400).json({ message: "link id is required" });
    }

    const link = await Links.findById(linkId);

    if (!link) {
      return res.status(404).json({ message: "link not found" });
    }

    if (link.userId.toString() !== userId) {
      return res.status(403).json({ message: "unauthorized access" });
    }

    await Links.findByIdAndDelete(linkId);
    res.status(200).json({ message: "link deleted successfully" });
  } catch (error) {
    console.error("error deleting link:", error);
    res.status(500).json({ message: "server error while deleting link" });
  }
};

// update a specific link
export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;

    const linkToUpdate = await Links.findById(id);

    if (!linkToUpdate) {
      return res.status(404).json({ message: "link not found" });
    }

    if (linkToUpdate.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "unauthorized access" });
    }

    if (title) linkToUpdate.title = title;
    if (link) linkToUpdate.link = link;

    await linkToUpdate.save();

    res.status(200).json(linkToUpdate);
  } catch (error) {
    console.error("error updating link:", error);
    res.status(500).json({ message: "server error while updating link" });
  }
};

// update the click count for a specific link
export const updateLinkClickCount = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Links.findById(id);

    if (!link) {
      return res.status(404).json({ message: "link not found" });
    }

    link.clicks = (link.clicks || 0) + 1;
    await link.save();

    res.status(200).json({ message: "click count updated successfully", link });
  } catch (error) {
    console.error("error updating click count:", error);
    res.status(500).json({ message: "server error while updating click count" });
  }
};
