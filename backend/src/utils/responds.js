exports.success = (res, data) => {
   return res.status(200).json({ ...data });
};

exports.failed = (res, message) => {
   return res.status(400).json({ message: message });
};

exports.error = (res, message) => {
   return res.status(500).json({ message: message });
};
