'use strict';

module.exports = (options, app) => {
  return async (ctx, next) => {

    const user = { id: '611ee12a05b6234c6c40a4ad' };
    ctx.fuck = user;

    await next();

    // ctx.user = 
    // console.log('ctx.user:', ctx.user)

    // const { request, headers, method, url, originalUrl, origin, href, path,
    //   query, queries, querystring, params, host, hostname, fresh, stale, protocol, ip, ips } = ctx;
    // const { body, files } = request;

    // const debug = Object.assign({}, {
    //   headers, method, url, originalUrl, origin, href, path,
    //   query, params, host, hostname, fresh, stale, protocol, ip, ips
    // }, { body, files });

    // try {
    //   await next();
    //   Object.assign(debug, { respondBody: ctx.body })
    // } catch (error) {
    //   console.error(error);
    //   if (error.code && error.details) ctx.body = { success: false, message: `Error#${error.code}, ${error.details}` }
    // }
    // console.log(debug);
  };
};
