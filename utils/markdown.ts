import { join } from 'path';

// replace lines that start with "$" if the type of the parent element is a codeblock
export function bashFixer(md) {
  md.core.ruler.push('bashfixer', (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      if (state.tokens[i].type !== 'fence') continue;
      let lines = state.tokens[i].content.split('\n');

      for (let j = 0; j < lines.length; j++) {
        lines[j] = lines[j].replace(/^\$( ?)/, '');
      }
      state.tokens[i].content = lines.join('\n');
    }
  });
}

// fix relative resources, such as images and links
export function resourceFixer(md) {
  md.core.ruler.push('resourcefixer', (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      if (state.tokens[i].type === 'htmlblock') {
        // replace srcs
        state.tokens[i].content = state.tokens[i].content.replace(
          /((src)=")(?!(http|https))(?!#)([^\s\\]*)(")/g,
          (occ: string) => {
            // we can't use lookahead and lookbehind REGEXes, beacuse safari does not support them
            // instead we replace the " and the src="
            let occurance = occ.replace('src="', '').replace('"', '');
            // we later replace <MOD_NAME> in [module].tsx, but we do not know the value of that yet
            return `src="${join('https://x.nest.land/<MOD_NAME>/', occurance)}"`;
          }
        );
        // replace hrefs
        state.tokens[i].content = state.tokens[i].content.replace(
          /((href)=")(?!(http|https))(?!#)([^\s\\]*)(")/g,
          (occ: string) => {
            let occurance = occ.replace('href="', '').replace('"', '');
            return `src="${join('https://x.nest.land/<MOD_NAME>/', occurance)}"`;
          }
        );
      } else if (state.tokens[i].content) {
        //
        // console.log(state.tokens[i]);
        //
      }
    }
  });
}
