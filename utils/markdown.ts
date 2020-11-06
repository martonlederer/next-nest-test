// replace lines that start with "$" if the type of the parent element is a codebloc
export function bashFixer (md) {
  md.core.ruler.push('bashfixer', (state) => {
    for(let i = 0; i < state.tokens.length; i++) {        
      if(state.tokens[i].type !== 'fence') continue;
      let lines = state.tokens[i].content.split('\n');
      
      for(let j = 0; j < lines.length; j++) {
        lines[j] = lines[j].replace(/^\$( ?)/, '');
      }
      state.tokens[i].content = lines.join('\n');
    }
  });
}