const bodyParser = require('body-parser');
const cors = require('cors');
const newsletterRoutes = require('./routes/newsletter');
const contactRoutes = require('./routes/contact');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use external routes
app.use('/newsletter', newsletterRoutes);
app.use('/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});