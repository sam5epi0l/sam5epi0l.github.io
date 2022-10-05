import { TermColors } from "../constants.js";
import { colorize, sleep } from "../utils.js";
import fileSystem from "../file-system.js";

const WebApps = [
  {
    name: 'blog',
    url: 'https://medium.com/@sam5epi0l'
  },
  {
    name: 'github',
    url: 'https://github.com/sam5epi0l/'
  },
  {
    name: 'twitter',
    url: 'https://www.twitter.com/sam5epi0l'
  },
  {
    name: 'issues',
    url: 'https://github.com/sam5epi0l/sam5epi0l.github.io/issues/'
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/sam5epi0l/'
  },
  {
    name: 'source',
    url: 'https://github.com/sam5epi0l/sam5epi0l.github.io'
  },
];

const open = {
  id: "open",
  description: 'open files or applications',
  usage: `\r\n\topen filename\r\n\topen [${WebApps.map(app => app.name).join(' | ')}]`,
  args: 1,
  async exec(term, args) {
    let url = '';
    const file = fileSystem.get(args[0]);
    if (file) {
      url = `${window.location.origin}${file.path}`;
    } else {
      const app = WebApps.find(a => a.name === args[0]);
      if (app) {
        url = app.url;
      }
    }

    if (url === '') {
      term.writeln(colorize(TermColors.Red, '[error]: ') + `"${args[0]}" no such file or application`);
      term.writeln(this.usage);
      return;
    }
    term.writeln(`opening ${args[0]}...`);
    await sleep(1000);
    window.open(url);
  }
};

export default open;


