class FileController {
  async store(req, res) {
    console.log('file -===> ', req.file);
  }
}

export default new FileController();
