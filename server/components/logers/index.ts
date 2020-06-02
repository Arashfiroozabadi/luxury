import chalk from 'chalk';

function Loger(
  type:'info' | 'error' | 'warn',
  msg?:string | number| any,
):void{
  switch (type) {
    case 'info':
      console.log(`[ ${chalk.blue.bold('info')} ] ${msg}`);
      break;
    case 'error':
      console.log(`[ ${chalk.red.bold('Error')} ] ${msg}`);
      break;
    case 'warn':
      console.log(`[ ${chalk.red.bold('warning')} ] ${msg}`);
      break;
    default:
      break;
  }
}

export default Loger;
