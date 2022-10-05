const Files = [
  {
    name: "resume.pdf",
    path: "/files/resume.pdf",
    content: '',
    deleted: false,
    downloadName: 'sam_sepiol_resume.pdf',
  },
  {
    name: 'projects.md',
    deleted: false,
    path: '/files/projects.md',
    content: ''
  }
];

function parseRSSFeed(content) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(content, "text/xml");
  const posts = xmlDoc.getElementsByTagName('item');
  const lastPosts = [];
  for (let i = 0; i < 5; i++) {
    const title = posts[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
    const link = posts[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
    lastPosts.push(`# ${title}\r\n${link}\r\n`);
  }

  return lastPosts.join('\n');
}

async function loadFile(file) { 
  const res = await fetch(file.path);
  file.content = await res.text();
  if (file.name === 'blog.md') {
    file.content = parseRSSFeed(file.content);
  }
}

const fileSystem = {
  get(fileName) {
    return this.files.find(f => f.name === fileName);
  },

  getAll() {
    return this.files.map(f => f.name);
  },

  get files() {
    return Files.filter(f => !f.deleted);
  },

  async load() {
    const tasks = [];
    for (const file of Files.filter(f => f.name.includes('.md'))) {
      tasks.push(loadFile(file));
    }
    await Promise.all(tasks);
  },

  remove(fileName) {
    const file = this.get(fileName);
    if (file) {
      file.deleted = true;
    }
  },
};

export default fileSystem;
