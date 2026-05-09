import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export const uploadProductImages = (req: any, res: any, next: any) => {
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ])(req, res, (err) => {
    next(err || undefined);
  });
};

export const uploadCategoryImage = upload.fields([
  { name: "image", maxCount: 1 },
]);

export const uploadUserAvatar = upload.fields([
  { name: "profileImage", maxCount: 1 },
]);
