'use strict';

module.exports = (options, app) => {
  return async (ctx, next) => {

    await next();

    const { request, headers, method, url, originalUrl, origin, href, path,
      query, queries, querystring, params, host, hostname, fresh, stale, protocol, ip, ips } = ctx;
    const { body, files } = request;

    const data = Object.assign({}, {
      headers, method, url, href, path, query, params, host, hostname, protocol, ip, ips
    }, { body, files, user: ctx.user });

    // try {
    //   await next();
    //   Object.assign(debug, { respondBody: ctx.body })
    // } catch (error) {
    //   console.error(error);
    //   if (error.code && error.details) ctx.body = { success: false, message: `Error#${error.code}, ${error.details}` }
    // }
    // console.log(debug);

    ctx.log.info(JSON.stringify(data));
  };
};
