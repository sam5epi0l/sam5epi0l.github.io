import {TermColors} from "../constants.js";
import {colorize} from "../utils.js";

const LAST_UPDATE = '2022-05-26';

const whoami = {
  id: "whoami",
  args: 0,
  description: 'display effective developer info',
  async exec(term, _args) {
    term.writeln(colorize(TermColors.Green, 'name: ') + 'Sam');
    term.writeln(colorize(TermColors.Green, 'host: ') + window.location.host);
    term.writeln(colorize(TermColors.Green, 'current position: ') + 'Hacker');
    term.writeln(colorize(TermColors.Green, 'company: ') + 'Self Taught < 127.0.0.1 >');
    term.writeln(colorize(TermColors.Green, 'location: ') + '404');
    term.writeln(colorize(TermColors.Green, 'fav languages: ') + '[golang, rust, typescript]');
    term.writeln(colorize(TermColors.Green, 'hobbies: ') + '[photography, hacking]');
    term.writeln(colorize(TermColors.Green, 'blog: ') + 'https://medium.com/@sam5epi0l');
    term.writeln(colorize(TermColors.Green, 'last update: ') + LAST_UPDATE);
  },
};

export default whoami;
