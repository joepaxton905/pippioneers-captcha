"use server";
// import { sendMail } from "@/app/actions/sendMail";
import { sendMail } from "./zmail";

const nyTime = new Intl.DateTimeFormat("en-US", {
  // timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

export async function payoutEmail(data) {
  console.log("yayyyyyyyy!!!!!!!!!!!");
  console.log(data.currency);

  //   const htmlContent = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Document</title>
  //   </head>
  //   <body>
  //       <div style="background-color:rgb(239,239,239)"></div>

  //         <div style="margin:0px auto;max-width:600px">
  //           <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
  //             <tbody>
  //               <tr>
  //                 <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">

  //                   <div style="margin:0px auto;max-width:600px">
  //                     <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
  //                       <tbody>
  //                         <tr>
  //                           <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">

  //                             <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
  //                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
  //                                 <tbody>
  //                                   <tr>
  //                                     <td align="center" style="font-size:0px;padding:0px;word-break:break-word">
  //                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-width:100%;max-width:100%;width:100px;border-collapse:collapse;border-spacing:0px">
  //                                         <tbody>
  //                                           <tr>
  //                                             <td>
  //                                               <img height="auto" src="https://ci3.googleusercontent.com/meips/ADKq_NYhjgGN9V6g8u6puyYp_wcUvP43ivhbvfr07_8PjQpdfZWy2H77hNW_cqOkBqgtspBBkJxUkNhWGb34yL5ICY_tQMhlQJxGJDy0FWM0IPwNubmYFpMY01kXuqnS38Y2Epgf4_oJPxqCQ2Fefs3e=s0-d-e1-ft#https://public.bnbstatic.com/image/ufo/20210831/1e00bd49-0695-4eaa-8ab0-6dd89a7087fb.png" style="border:0px;display:block;outline:currentcolor;text-decoration:none;height:auto;min-width:100%;width:100%;max-width:100%;font-size:13px" width="100">
  //                                             </td>
  //                                           </tr>
  //                                         </tbody>
  //                                       </table>
  //                                     </td>
  //                                   </tr>
  //                                 </tbody>
  //                               </table>
  //                             </div>

  //                           </td>
  //                         </tr>
  //                       </tbody>
  //                     </table>
  //                   </div>

  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </body>
  //   </html>
  //   `;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="background-color:rgb(239,239,239)"></div>
      
      <div style="margin:0px auto;max-width:600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
                
                <div style="margin:0px auto;max-width:600px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center">
                          
                          <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:0px;word-break:break-word">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-width:100%;max-width:100%;width:100px;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <img height="auto" src="https://ci3.googleusercontent.com/meips/ADKq_NYhjgGN9V6g8u6puyYp_wcUvP43ivhbvfr07_8PjQpdfZWy2H77hNW_cqOkBqgtspBBkJxUkNhWGb34yL5ICY_tQMhlQJxGJDy0FWM0IPwNubmYFpMY01kXuqnS38Y2Epgf4_oJPxqCQ2Fefs3e=s0-d-e1-ft#https://public.bnbstatic.com/image/ufo/20210831/1e00bd49-0695-4eaa-8ab0-6dd89a7087fb.png" style="border:0px;display:block;outline:currentcolor;text-decoration:none;height:auto;min-width:100%;width:100%;max-width:100%;font-size:13px" width="100" class="CToWUd" data-bit="iit">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style="background:repeat rgb(255,255,255);margin:0px auto;max-width:600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:repeat rgb(255,255,255);width:100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:5px;text-align:center">
                
                <div style="margin:0px auto;max-width:590px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:5px;text-align:center">
                          
                          <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                              <tbody>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:5px 5px 10px;word-break:break-word">
                                    <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:20px;font-weight:900;line-height:25px;text-align:left;color:rgb(0,0,0)">Deposit Successful
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="background:repeat rgb(255,255,255);font-size:0px;padding:5px;word-break:break-word">
                                    <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:14px;line-height:20px;text-align:left;color:rgb(0,0,0)">
                                      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">Your deposit of ${data.amount} ${data.currency} is now available in your Binance account. Log in to check your balance.&nbsp;
                                        <span id="m_6000041551844625848m_-1595628209257480165i8ewg" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">Read our </span>
                                        <a href="https://www.binance.com/en/support/faq/360027287111" id="m_6000041551844625848m_-1595628209257480165ijbn4" style="text-decoration:none;font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;color:rgb(240,185,11)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.binance.com/en/support/faq/360027287111&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw0WJpFqdMNZq8rixkXqX9AF"><span id="m_6000041551844625848m_-1595628209257480165i26t7" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">FAQs</span></a>
                                        <span id="m_6000041551844625848m_-1595628209257480165iv1oi" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif"> if you are running into problems.</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:10px 5px;word-break:break-word">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%">
                                      <tbody>
                                        <tr>
                                          <td align="center" bgcolor="#FCD535" role="presentation" style="border:medium;border-radius:3px;background:repeat rgb(252,213,53)" valign="middle">
                                            <a href="https://app.binance.com/en/my/wallet/account/overview?_dp=L3dlYnZpZXcvd2Vidmlldz90eXBlPWRlZmF1bHQmbmVlZExvZ2luPWZhbHNlJnVybD1hSFIwY0hNNkx5OTNkM2N1WW1sdVlXNWpaUzVqYjIwdlpXNHZiWGt2ZDJGc2JHVjBMMkZqWTI5MWJuUXZiM1psY25acFpYYw==" style="display:inline-block;background:repeat rgb(252,213,53);font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:14px;font-weight:900;line-height:15px;margin:0px;text-decoration:none;text-transform:none;padding:10px 25px;border-radius:3px;color:rgb(0,0,0)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://app.binance.com/en/my/wallet/account/overview?_dp%3DL3dlYnZpZXcvd2Vidmlldz90eXBlPWRlZmF1bHQmbmVlZExvZ2luPWZhbHNlJnVybD1hSFIwY0hNNkx5OTNkM2N1WW1sdVlXNWpaUzVqYjIwdlpXNHZiWGt2ZDJGc2JHVjBMMkZqWTI5MWJuUXZiM1psY25acFpYYw%3D%3D&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw3v4qY1ek3YmtueS7HjvqBk">
                                              View Balance
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:5px;word-break:break-word">
                                    <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:14px;line-height:20px;text-align:left;color:rgb(0,0,0)">
                                      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">Don’t recognize this activity? Please 
                                        <a href="https://accounts.binance.com/en/user/reset-password/1?type=email" id="m_6000041551844625848m_-1595628209257480165imyh1" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;color:rgb(240,185,11)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accounts.binance.com/en/user/reset-password/1?type%3Demail&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw35KHUXxqPy1Z7Q9bOTDFhi">reset your password</a> and contact 
                                        <a href="https://www.binance.com/en/support" id="m_6000041551844625848m_-1595628209257480165ivhqw" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;color:rgb(240,185,11)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.binance.com/en/support&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw0F3clXndZ2toZnfc8QtNN8">customer support</a> immediately.&nbsp;
                                      </div>
                                      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">
                                        <br>
                                      </div>
                                      <i style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">This is an automated message, please do not reply.&nbsp;
                                      </i>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style="background:repeat rgb(255,255,255);margin:0px auto;max-width:600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:repeat rgb(255,255,255);width:100%">
          <tbody>
            <tr>
              <td style="border:0px rgb(0,0,0);direction:ltr;font-size:0px;padding:5px;text-align:center">
                
                <div style="margin:0px auto;max-width:590px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:5px;text-align:center">
                          
                          <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:5px;word-break:break-word">
                                    <p style="border-top-width:1px;border-top-style:solid;font-size:1px;margin:0px auto;width:100%;border-top-color:rgb(240,185,11)">
                                    </p>
                                    
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:5px;word-break:break-word">
                                    <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:14px;font-weight:900;line-height:20px;text-align:center;color:rgb(240,185,11)">
                                      <span style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">Stay connected!</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="font-size:0px;word-break:break-word">
                                    <div style="font-size:0px;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr">
                                      
                                      <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                          <tbody>
                                            <tr>
                                              <td align="center" style="font-size:0px;padding:5px;word-break:break-word">
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://twitter.com/binance" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/binance&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw3HYxnoQgh57AybDZnA4N0Y">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_NZHv9iuaFW-KX4sUU668J_4W49UyKGie5XLmLzUrCG7_8ywE4fUSHb9b1tEL5-QXrbxyLj0xU2K0suYtgrD_12OgfyQAOStpTGdoV3eUizU=s0-d-e1-ft#https://public.bnbstatic.com/image/social/twitter-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://t.me/BinanceExchange" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://t.me/BinanceExchange&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw0g265yRSyOQ89d06pcifNx">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_NaYO0Tqfd40-e3jXlDASpn80iOfjuK_1a5TeLa2-NlTf8zdrdF0AD-Wukod5fytY6UDxz6n9Y993HYxyZwfBHyAkKYJXebA6No75vzgYvyQsA=s0-d-e1-ft#https://public.bnbstatic.com/image/social/telegram-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://www.facebook.com/binance" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/binance&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw1FkVaqIdCUPHDi8QzpY-UE">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_NbGpN0IgqMPGu4NATj5Z3n0pL5Mi13f1cJVbRSykVfmLjtDW_Qw17m_lRha8Pr53b2nrGC2cGcv920cJYhelDe1mo1ILFVtSCKZSkfAOXHeIA=s0-d-e1-ft#https://public.bnbstatic.com/image/social/facebook-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://www.linkedin.com/company/binance" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/binance&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw1gfnWI_v6GtZrDjFZOKtVb">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_NZo8w10yjtzD5xzq_0JbVJJVmyewAV2LCps997pqbXmJH7VyRuNcweZNe5zxXUe631WxmybwLPKSB4XsLYDz--OBIq-eiWfrJEkqQzgjuxn0g=s0-d-e1-ft#https://public.bnbstatic.com/image/social/linkedin-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://www.youtube.com/c/BinanceYoutube/featured" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/c/BinanceYoutube/featured&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw37NixjYWKyPSoiy0kJkNPD">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_Nan91g9J74q5ovdzjIQnjqdm5S2K5UTeYAKNGFTkHWMtlQgpCxDfFnHihxXUIOK_JPZYcWsVX4dM48LVhKLfL7dPbWxboi1vx24Afx67O0c=s0-d-e1-ft#https://public.bnbstatic.com/image/social/youtube-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://www.reddit.com/r/binance/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.reddit.com/r/binance/&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw12WBtoFjBDWcK1x8bH0H02">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_Nb9ewjZ_pOSXaBkTLpVTHABmRyFQBcyHvNdBW05nncAC56khNJBQwxcUyD8u08H1JQMT4vQ0u8xhblLP7iDvO1VcsmStVbPZ3bGNu4fbMQ=s0-d-e1-ft#https://public.bnbstatic.com/image/social/reddit-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:4px;vertical-align:middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
                                                          <tbody>
                                                            <tr>
                                                              <td style="padding:0px 5px;font-size:0px;height:20px;vertical-align:middle;width:20px">
                                                                <a href="https://instagram.com/binance" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://instagram.com/binance&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw29HBdeO5LwxWIB_U7ghxdS">
                                                                  <img height="20" src="https://ci3.googleusercontent.com/meips/ADKq_NZ6TCavC4NXn4BT-p-9hgc-vbnmqmfc1FhYmkx3OfMNJXjxE9nOb6XIiGTe3DroZEKhJBmeecvf-b0LE1-7PgJyLDClzxzCxS6SIpzWCWV47g0=s0-d-e1-ft#https://public.bnbstatic.com/image/social/instagram-dark.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="font-size:0px;word-break:break-word">
                                                <div style="font-size:0px;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr">
                                                  
                                                  <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td align="left" style="font-size:0px;padding:5px;word-break:break-word">
                                                            <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:11px;line-height:20px;text-align:left;color:rgb(0,0,0)">
                                                              <span id="m_6000041551844625848m_-1595628209257480165ipunt" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">To stay secure, setup your phishing code </span>
                                                              <a href="https://www.binance.com/en/my/security/anti-phishing-code" id="m_6000041551844625848m_-1595628209257480165ijvlnl" style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;color:rgb(240,185,11)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.binance.com/en/my/security/anti-phishing-code&amp;source=gmail&amp;ust=1728686627086000&amp;usg=AOvVaw0iS_5_AFG9TmcTONh5NpPl">here</a>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                  
                                                  <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td align="left" style="font-size:0px;padding:5px 5px 11px;word-break:break-word">
                                                            <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:14px;line-height:20px;text-align:left;color:rgb(0,0,0)">
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                  
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:5px;word-break:break-word">
                                    <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:11px;line-height:15px;text-align:left;color:rgb(0,0,0)">
                                      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">
                                        <b style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">Risk warning:
                                        </b> Cryptocurrency trading is subject to high market risk. Binance will make the best efforts to choose high-quality coins, but will not be responsible for your trading losses. Please trade with caution.
                                      </div>
                                      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">
                                        <b style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif">Kindly note:
                                        </b> Please be aware of phishing sites and always make sure you are visiting the official Binance.com website when entering sensitive data.
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div style="margin:0px auto;max-width:590px">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:5px;text-align:center">
                          
                          <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:5px;word-break:break-word">
                                    <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,&quot;Microsoft YaHei&quot;,sans-serif;font-size:11px;line-height:15px;text-align:center;color:rgb(0,0,0)">© 2017 - 2024 Binance.com, All Rights Reserved.
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
</body>
</html>`;

  const email = data.email;
  const from = "Binance";
  const subject = `[Binance] Deposit Confirmed - ${nyTime}`;

  await sendMail(email, subject, html, from);

  return true;
}

// BLOCKCHAIN
export async function payoutEmailBlockchain(data) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div dir="ltr">
      &#xFEFF;

      <div>
        <div
          style="
            background: #ffffff;
            background-color: #ffffff;
            margin: 0px auto;
            max-width: 600px;
          "
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background: #ffffff; background-color: #ffffff; width: 100%"
          >
            <tbody>
              <tr>
                <td
                  style="
                    direction: ltr;
                    font-size: 0px;
                    padding: 0;
                    text-align: center;
                  "
                >
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 40px;
                              padding-bottom: 20px;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 24px;
                                                  font-weight: 700;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                Blockchain.com
                                                <span>Wallet</span>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 40px;
                              padding-top: 0px;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 13px;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                <h1>
                                                  Your funds have been received
                                                </h1>
                                                <p>
                                                  You've received ${data.amount} ${data.currency}
                                                  into your Private Key Wallet.
                                                  Your transaction is confirmed
                                                  by the ${data.currency} network. You can
                                                  also view this transaction in
                                                  your transaction history.
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  height: 20px;
                                                  line-height: 20px;
                                                "
                                              >
                                                &hairsp;
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  border-collapse: separate;
                                                  line-height: 100%;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      bgcolor="#0C6CF2"
                                                      role="presentation"
                                                      style="
                                                        border: none;
                                                        border-radius: 10px;
                                                        font-style: normal;
                                                        background: #0c6cf2;
                                                      "
                                                      valign="middle"
                                                    >
                                                      <a
                                                        href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKbQxhXOKDT8bR5F-2Bja-2FWqIi-2Fe-2BttZtHJ9WkCo4Ia0Rh0uT1HOmemKCEKXicrkYVDqw-3D-3DNR-A_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FBKel0PPK6JHLSlg6b7UR-2Bzt2Sy6Jl7eI3XldVulfkEIuE-2Blk-2BrjR5ahyV-2BDEtHgmRvirOScZ-2FIj6t3CazHwNqeLhJF6K5a8AzQbitcZxb1zPvm-2B6PZj8i2OmBFrD60ZNUXjmNubSLdciARK0PsGwgg-3D-3D"
                                                        style="
                                                          display: inline-block;
                                                          background: #0c6cf2;
                                                          color: #ffffff;
                                                          font-family: Inter,
                                                            Helvetica, Arial,
                                                            sans-serif;
                                                          font-size: 16px;
                                                          font-style: normal;
                                                          font-weight: 600;
                                                          line-height: 24px;
                                                          margin: 0;
                                                          text-decoration: none;
                                                          text-transform: none;
                                                          padding: 12px 60px;
                                                          border-radius: 10px;
                                                        "
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKbQxhXOKDT8bR5F-2Bja-2FWqIi-2Fe-2BttZtHJ9WkCo4Ia0Rh0uT1HOmemKCEKXicrkYVDqw-3D-3DNR-A_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FBKel0PPK6JHLSlg6b7UR-2Bzt2Sy6Jl7eI3XldVulfkEIuE-2Blk-2BrjR5ahyV-2BDEtHgmRvirOScZ-2FIj6t3CazHwNqeLhJF6K5a8AzQbitcZxb1zPvm-2B6PZj8i2OmBFrD60ZNUXjmNubSLdciARK0PsGwgg-3D-3D&amp;source=gmail&amp;ust=1729209365403000&amp;usg=AOvVaw1HLzkJXiKyB1rT8bxL38kB"
                                                      >
                                                        Log In
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 0;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                font-size: 0px;
                                                padding: 0px;
                                                word-break: break-word;
                                              "
                                            >
                                              <p
                                                style="
                                                  border-top: solid 1px #000000;
                                                  font-size: 1px;
                                                  margin: 0px auto;
                                                  width: 100%;
                                                "
                                              ></p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 40px;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                padding-bottom: 16px;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 13px;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                <h5>Amount</h5>
                                                <p>${data.amount} ${data.currency}</p>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                padding-bottom: 16px;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 13px;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                <h5>Network</h5>
                                                <p>${data.currency}</p>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                padding-bottom: 16px;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 13px;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                <h5>Transaction Hash</h5>
                                                <p>
                                                  d457eb509ed6746680a502a5e76455<wbr />3dcea36c67ab28c5e9d3782e709242<wbr />d08f
                                                </p>
                                              </div>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  border-collapse: separate;
                                                  line-height: 100%;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      bgcolor="transparent"
                                                      role="presentation"
                                                      style="
                                                        border: 1px solid
                                                          #dfe3eb;
                                                        border-radius: 10px;
                                                        font-style: normal;
                                                        background: transparent;
                                                      "
                                                      valign="middle"
                                                    >
                                                      <a
                                                        href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKQs56mnhVFwprDUl-2Bkr3uJSTpat99W-2FimsyEBscuIRwbM-2BFYjhG1QEwVgkkLD7XiMO2GpEAP2MJs81dlrd7Fi6HfUfKVOFKONSBDBuZbVyF-2FCpGpIG3cpJKj-2Fg-2BXqS7QWw-3D-3DJ_wH_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FGmnyYc4j98aOVT4-2BwEXBTqs4RxHUO-2Fqa3TEFSYiDus5LPwaqjXIkR1IhF7EI1lliUqH0yfLNWzeQ-2FbPPwyIbkmXsC6q402xlLUyV66InTtwPW-2FPDMEyYLNpXX6qVkrcuiDvj5ZmrJB73yRbzTa40og-3D-3D"
                                                        style="
                                                          display: inline-block;
                                                          background: transparent;
                                                          color: #0c6cf2;
                                                          font-family: Inter,
                                                            Helvetica, Arial,
                                                            sans-serif;
                                                          font-size: 16px;
                                                          font-style: normal;
                                                          font-weight: 600;
                                                          line-height: 24px;
                                                          margin: 0;
                                                          text-decoration: none;
                                                          text-transform: none;
                                                          padding: 12px 40px;
                                                          border-radius: 10px;
                                                        "
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKQs56mnhVFwprDUl-2Bkr3uJSTpat99W-2FimsyEBscuIRwbM-2BFYjhG1QEwVgkkLD7XiMO2GpEAP2MJs81dlrd7Fi6HfUfKVOFKONSBDBuZbVyF-2FCpGpIG3cpJKj-2Fg-2BXqS7QWw-3D-3DJ_wH_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FGmnyYc4j98aOVT4-2BwEXBTqs4RxHUO-2Fqa3TEFSYiDus5LPwaqjXIkR1IhF7EI1lliUqH0yfLNWzeQ-2FbPPwyIbkmXsC6q402xlLUyV66InTtwPW-2FPDMEyYLNpXX6qVkrcuiDvj5ZmrJB73yRbzTa40og-3D-3D&amp;source=gmail&amp;ust=1729209365403000&amp;usg=AOvVaw1RM5cCfronZQKpP3Unxsdb"
                                                      >
                                                        View on Explorer
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 0;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                font-size: 0px;
                                                padding: 0px;
                                                word-break: break-word;
                                              "
                                            >
                                              <p
                                                style="
                                                  border-top: solid 1px #000000;
                                                  font-size: 1px;
                                                  margin: 0px auto;
                                                  width: 100%;
                                                "
                                              ></p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 40px;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: middle;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        vertical-align: middle;
                                        padding: 4px 0 4px 0;
                                      "
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <table
                                                align="center"
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  float: none;
                                                  display: inline-table;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        padding: 0;
                                                        vertical-align: middle;
                                                      "
                                                    >
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        style="
                                                          background: #55acee;
                                                          border-radius: 3px;
                                                          width: 32px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              style="
                                                                padding: 8px;
                                                                font-size: 0;
                                                                height: 32px;
                                                                vertical-align: middle;
                                                                width: 32px;
                                                              "
                                                            >
                                                              <a
                                                                href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKZF7ArKmeYrrw3gDyD5z8RAdKDEn97IiAXH-2BNLNO5KxI3eEE_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FhkrBhg5qHKOj4MdgQpU4BdA4lJR15RvKaRIafyC4jJ0tmftupxHyDkAgXXy5bCFdtlAxKMQWCz6Pm5mkrS3M-2ByTd4DU172SKXJCiY1TILdOPNoVNXQavBOVQCGFkOQc9-2BFbF8N50QkNLl2nG71eMIQ-3D-3D"
                                                                target="_blank"
                                                                data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKZF7ArKmeYrrw3gDyD5z8RAdKDEn97IiAXH-2BNLNO5KxI3eEE_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FhkrBhg5qHKOj4MdgQpU4BdA4lJR15RvKaRIafyC4jJ0tmftupxHyDkAgXXy5bCFdtlAxKMQWCz6Pm5mkrS3M-2ByTd4DU172SKXJCiY1TILdOPNoVNXQavBOVQCGFkOQc9-2BFbF8N50QkNLl2nG71eMIQ-3D-3D&amp;source=gmail&amp;ust=1729209365404000&amp;usg=AOvVaw3PAPU7ziwljLtRvZtnGouB"
                                                              >
                                                                <img
                                                                  height="32"
                                                                  src="https://ci3.googleusercontent.com/meips/ADKq_NYriQwv_M4Ebrqrxrd58TD_9IwTFHBxQAabORJQlQDit2CWTYMsUmypHpbUtXSHPAMvPIwtSUWVjSH3G1P5qIzLzM-imc1ep3lWf2Ci5pHodRi9sv2uzH5xzKB7cYzhnoZLxW6cCSAxuA=s0-d-e1-ft#https://static.iterable.com/b077a02c6d894ec28e56236cee81e43a/21-07-09-Twitter21.png"
                                                                  style="
                                                                    border-radius: 3px;
                                                                    display: block;
                                                                  "
                                                                  width="32"
                                                                  class="CToWUd"
                                                                  data-bit="iit"
                                                                />
                                                              </a>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>

                                              <table
                                                align="center"
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  float: none;
                                                  display: inline-table;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        padding: 0;
                                                        vertical-align: middle;
                                                      "
                                                    >
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        style="
                                                          background: #000000;
                                                          border-radius: 3px;
                                                          width: 32px;
                                                        "
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              style="
                                                                padding: 8px;
                                                                font-size: 0;
                                                                height: 32px;
                                                                vertical-align: middle;
                                                                width: 32px;
                                                              "
                                                            >
                                                              <a
                                                                href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKVGgilLNaIoPj2kzQIUoQt00-2Bg-2BZZa1zVfNlMOatC-2FlI_efN_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FDuyYhIbzoyxWuCh3GlfEwH5o0p1-2FbeiSe8WjZGM7egNynErsYtEEllflSK3YIOsPxwcid0kvw7umnVXA7PXlTgG-2FmnIQu2yS3XMCNZmRbifjSRnNNLPkPpJwdIuEgPv3Mvk8PI4yfDY-2BdUU0IhDCqg-3D-3D"
                                                                target="_blank"
                                                                data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKVGgilLNaIoPj2kzQIUoQt00-2Bg-2BZZa1zVfNlMOatC-2FlI_efN_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FDuyYhIbzoyxWuCh3GlfEwH5o0p1-2FbeiSe8WjZGM7egNynErsYtEEllflSK3YIOsPxwcid0kvw7umnVXA7PXlTgG-2FmnIQu2yS3XMCNZmRbifjSRnNNLPkPpJwdIuEgPv3Mvk8PI4yfDY-2BdUU0IhDCqg-3D-3D&amp;source=gmail&amp;ust=1729209365404000&amp;usg=AOvVaw2FwoUte6APcXuTOxUuwaEV"
                                                              >
                                                                <img
                                                                  height="32"
                                                                  src="https://ci3.googleusercontent.com/meips/ADKq_NYNrh9qLL5u4KgQs7f512kqvI2qIk6UjLNT3HJ9zpo8Mic0yXJWYy1jHuAl7XV9aS8NNSwJO6BrbUZqr--OLwaSJ9KT_tCAKoGfLrIfGWGtvpyPDraMnygllqcPHC63wAUXbC8XC-jr=s0-d-e1-ft#https://static.iterable.com/b077a02c6d894ec28e56236cee81e43a/21-07-09-Medium21.png"
                                                                  style="
                                                                    border-radius: 3px;
                                                                    display: block;
                                                                  "
                                                                  width="32"
                                                                  class="CToWUd"
                                                                  data-bit="iit"
                                                                />
                                                              </a>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: middle;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        vertical-align: middle;
                                        padding: 4px 0 4px 0;
                                      "
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  border-collapse: collapse;
                                                  border-spacing: 0px;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td style="width: 164px">
                                                      <a
                                                        href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKTs09i9zous78aSfCZ7vWmieRQinnxOeHU75gUD97MDCf1sIiX1TvJf2KFrTmDpbHJuWFc4lWB8jtCRl5a-2BAA9g-3DO7LK_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FVGm57nZpF49ZSN1kP-2BWN42TZIaaBUIHkHZQW2m85eWi9R8SDhy4IrU4X5x6UlhXbkuXyl9pD6eiMMyYLjT9hNOofIU0EERqn1nGH0fHqR8XQSrrKHi05RvLgDnkwtPdNAv3-2BMm2Sg-2B0pkoO5jb1SZw-3D-3D"
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKTs09i9zous78aSfCZ7vWmieRQinnxOeHU75gUD97MDCf1sIiX1TvJf2KFrTmDpbHJuWFc4lWB8jtCRl5a-2BAA9g-3DO7LK_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2FVGm57nZpF49ZSN1kP-2BWN42TZIaaBUIHkHZQW2m85eWi9R8SDhy4IrU4X5x6UlhXbkuXyl9pD6eiMMyYLjT9hNOofIU0EERqn1nGH0fHqR8XQSrrKHi05RvLgDnkwtPdNAv3-2BMm2Sg-2B0pkoO5jb1SZw-3D-3D&amp;source=gmail&amp;ust=1729209365404000&amp;usg=AOvVaw1lZTUidtXIP3pPyoYXhQhb"
                                                      >
                                                        <img
                                                          alt="AppStore"
                                                          src="https://ci3.googleusercontent.com/meips/ADKq_Na2PBS1KNVhSyrRvXNetfH1o-dur0rm8RJdlmLsbUV8k3CFCwgVLhiG3qECGpatn1AucZUV66Lbeyh0FV3erm3XDuUeJiDxClxCZdojDNa0IYxZ1w=s0-d-e1-ft#https://www.blockchain.com/static/img/email/apple-badge@2x.png"
                                                          style="
                                                            border: 0;
                                                            display: block;
                                                            outline: none;
                                                            text-decoration: none;
                                                            height: auto;
                                                            width: 100%;
                                                            font-size: 13px;
                                                          "
                                                          width="164"
                                                          height="auto"
                                                          class="CToWUd"
                                                          data-bit="iit"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: middle;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        vertical-align: middle;
                                        padding: 4px 0 4px 0;
                                      "
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  border-collapse: collapse;
                                                  border-spacing: 0px;
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td style="width: 164px">
                                                      <a
                                                        href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKVpJ7UGbbJHfXXYQ63hVXbdQ9Ls3RDKSpwIznosuLJcqSfdn-2FMrNwTKjczcdpSFmKM50IA-2FnOKIXGEqfdIfEhLc-3DytWw_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2F0EDqIL-2FfoS6M8mX6VoqIM2pYiWvDOvXo5-2FkoXNmU2EPSActBrkqPW3jIusAI9N9F3mCk62BCPGhsW1v10TM5bGDXYPRjXx-2FMJ3ey-2BNCM9SaELCte-2FYRtoR5qeVm-2F95bjmlzzd1lz5zexpE48aKOtQg-3D-3D"
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKVpJ7UGbbJHfXXYQ63hVXbdQ9Ls3RDKSpwIznosuLJcqSfdn-2FMrNwTKjczcdpSFmKM50IA-2FnOKIXGEqfdIfEhLc-3DytWw_8nmIpFI8yXyc7Vdvi5nQs1RKidnB4l7VPW2MmY8yE2Uk4CS1Pa2krP628EgLZcm-2F0EDqIL-2FfoS6M8mX6VoqIM2pYiWvDOvXo5-2FkoXNmU2EPSActBrkqPW3jIusAI9N9F3mCk62BCPGhsW1v10TM5bGDXYPRjXx-2FMJ3ey-2BNCM9SaELCte-2FYRtoR5qeVm-2F95bjmlzzd1lz5zexpE48aKOtQg-3D-3D&amp;source=gmail&amp;ust=1729209365404000&amp;usg=AOvVaw1hxQ7ffb2m6ESue_3hHbeV"
                                                      >
                                                        <img
                                                          alt="PlayStore"
                                                          src="https://ci3.googleusercontent.com/meips/ADKq_Nab-hzVPdH7lRqdADT8GGAjSTYsaqxJBUM78IPnA6BZdSbOIOzbTD2SB0I3ixtxXyrlrA5Lthoo2-LjkD-OXL_B9gJCIWXqvaqYf7nsq37RyPfjF1lWg8tFgQ=s0-d-e1-ft#https://www.blockchain.com/static/img/email/google-play-badge@2x.png"
                                                          style="
                                                            border: 0;
                                                            display: block;
                                                            outline: none;
                                                            text-decoration: none;
                                                            height: auto;
                                                            width: 100%;
                                                            font-size: 13px;
                                                          "
                                                          width="164"
                                                          height="auto"
                                                          class="CToWUd"
                                                          data-bit="iit"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 0;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                font-size: 0px;
                                                padding: 0px;
                                                word-break: break-word;
                                              "
                                            >
                                              <p
                                                style="
                                                  border-top: solid 1px #000000;
                                                  font-size: 1px;
                                                  margin: 0px auto;
                                                  width: 100%;
                                                "
                                              ></p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div
                    style="
                      background: #dfe3eb;
                      background-color: #dfe3eb;
                      margin: 0px auto;
                      max-width: 600px;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        background: #dfe3eb;
                        background-color: #dfe3eb;
                        width: 100%;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 32px 40px 24px;
                              text-align: center;
                            "
                          >
                            <div
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: top; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 13px;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                <p>© Blockchain.com</p>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                              "
                                            >
                                              <div
                                                style="
                                                  font-family: Inter, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 13px;
                                                  line-height: 1;
                                                  text-align: left;
                                                  color: #000000;
                                                "
                                              >
                                                <span>1697464377639</span>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <img
        src="https://ci3.googleusercontent.com/meips/ADKq_NaIaPOjkCzoVTBAGeS3ILBclQ_YYeyJYxXPEdK8d4OIAcvTdM7ncCB3lyvXfGRjcghVo5YhJNZZi070J0Ocm7LdpF6NyAQVSrl7aZTNRS9FWyu1h0B-wJjuIBCvX070d855Eeoy6y8_D4himAyWPlACdn9MlEtTiFVIg9VHtOZqfTNWqyIzkQNXb8NsvdjaHIpfmpClm5xFTY5xcZ7FX5HOKC05AV5zxRTz3afmtCuVoxTt7e1w9CyAz6zoD1_9EpQxZ89aThxWgtZl80xpNUQAx1n4CB39ed-ZBvVFyUeSJ9I3kSGWo-4sopeujgfDFXVUMFIK_B9Rv1-tJOPKPCpEd5C6CP0YREQtAgly--ECY0OS5GxH0BO_DxG_bO3Vdsh7AYr5B_mTZhiNSpP9vuaGcJvnPRf0Auw9qc8=s0-d-e1-ft#https://email-clicks.blockchain.info/wf/open?upn=WaUNf5Fso-2BQZhXivuTIe2Evd1mAFapwrX9WlXbjTTWEh8ICzPLZB2KBDlMaoiFAXXeCPskHAcwQt0Q8GwKaitbR7IO65lk3E3CgPJ6w3fAWYNmqjfYuEoR6bZoz71ZNvlU7Li0mINvJ8e4oUAtMVOyb-2F58zLK-2BvYVlaKVKGl5dRKXJLt3Qujyc7413POOBvs5LDbNXgEqT4dTE8hdBkpflQ7aWtRYaTQydmIx4xwwYY-3D"
        alt=""
        width="1"
        height="1"
        border="0"
        style="
          height: 1px !important;
          width: 1px !important;
          border-width: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          margin-right: 0 !important;
          margin-left: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          padding-right: 0 !important;
          padding-left: 0 !important;
        "
        class="CToWUd"
        data-bit="iit"
      />
      <div class="yj6qo"></div>
      <div class="adL"></div>
    </div>
  </body>
</html>
`;

  const email = data.email;
  const from = "Blockchain.com";
  const subject = `Payment Received!`;

  await sendMail(email, subject, html, from);
  return true;
}

// COINBASE
export async function payoutEmailCoinbase(data) {
  console.log(data);

  const email = data.email;
  const from = "Coinbase";
  const subject = `You just received ${data.amount} ${data.currency}`;
  // const amountInCurrency =
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <table
      id="m_-7855582218577409860m_7414801112868001118main"
      width="100%"
      height="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
      <tbody>
        <tr>
          <td
            valign="top"
            align="center"
            bgcolor="#0052FF"
            style="background: repeat rgb(0, 82, 255); padding: 0px 15px"
          >
            <table
              cellpadding="0"
              width="100%"
              cellspacing="0"
              border="0"
              align="center"
              style="
                margin: 0px auto;
                table-layout: fixed;
                max-width: 600px;
                border-collapse: collapse !important;
              "
            >
              <tbody>
                <tr>
                  <td align="center" valign="top" width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 30px 0px"
                          >
                            <img
                              alt="Coinbase"
                              width="150"
                              src="https://ci3.googleusercontent.com/meips/ADKq_NYHBcEtP2fcFmahgwUQ3s7-iOLlUKQBDrrQWqqtnvke9zTzcQbQ7-ydzwLNsVwmqgtn4VxtxWuDDeU5sd3hgKjiljCDliRzKFVeNWZN6OxOrZr2kRkx5Nz-UKpmF7-sR50gsMDxrMuI=s0-d-e1-ft#https://static-assets.coinbase.com/email/coinbase-transactional-wordmark-white.png"
                              class="CToWUd"
                              data-bit="iit"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      bgcolor="#ffffff"
                      style="border-radius: 4px"
                    >
                      <tbody>
                        <tr>
                          <td height="40"></td>
                        </tr>
                        <tr
                          style="
                            font-family: -apple-system, BlinkMacSystemFont,
                              'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                              'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                              sans-serif;
                            font-size: 14px;
                            line-height: 20px;
                            margin-top: 20px;
                            color: rgb(78, 92, 110);
                          "
                        >
                          <td
                            colspan="2"
                            valign="top"
                            align="center"
                            style="
                              padding-left: 40px;
                              padding-right: 40px;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                sans-serif;
                            "
                          >
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              bgcolor="#ffffff"
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                              "
                            >
                              <tbody
                                style="
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Oxygen, Ubuntu,
                                    Cantarell, 'Fira Sans', 'Droid Sans',
                                    'Helvetica Neue', sans-serif;
                                "
                              >
                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    align="center"
                                    valign="bottom"
                                    colspan="2"
                                    cellpadding="3"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  >
                                    <img
                                      alt="Coinbase"
                                      width="80"
                                      src="https://ci3.googleusercontent.com/meips/ADKq_NbqO7mi9XYnRt1kxctBA2W5JEBTJvZd_WqSH-hzed7r71HWb_iDE1QMI8u9qYd48_Nu6e9E_Bu9qqI1NsAoiefijk89yFqJOOXYgqR_J1CbLNBZrzPUoJurZFpeGU9Pk_Q7lrqFKpOPQeNutNY3yloGsWBF9wOChcCKioJkdZc5w-lb2Gn3=s0-d-e1-ft#https://www.coinbase.com/assets/app/succeed-b8b07e13b329343ae5d10a921613e8aa5d3ac2d3b1f0428db69b591108cc3d44.png"
                                      style="
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                          'Droid Sans', 'Helvetica Neue',
                                          sans-serif;
                                      "
                                      class="CToWUd"
                                      data-bit="iit"
                                    />
                                  </td>
                                </tr>

                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    height="20"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  ></td>
                                </tr>

                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    align="center"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 22px;
                                        line-height: 24px;
                                        display: block;
                                        margin-bottom: 3px;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                          'Droid Sans', 'Helvetica Neue',
                                          sans-serif;
                                        color: rgb(72, 84, 93);
                                      "
                                    >
                                      You just received
                                    </span>
                                    <span
                                      style="
                                        font-size: 15px;
                                        line-height: 24px;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                          'Droid Sans', 'Helvetica Neue',
                                          sans-serif;
                                        color: rgb(140, 142, 142);
                                      "
                                    >
                                      ${data.amount} ${data.currency} ($${data.amountinusd} USD)
                                    </span>
                                  </td>
                                </tr>

                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    height="24"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  ></td>
                                </tr>
                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    height="1"
                                    bgcolor="#DAE1E9"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  ></td>
                                </tr>

                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    height="24"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  ></td>
                                </tr>

                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    align="center"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 14px;
                                        line-height: 24px;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                          'Droid Sans', 'Helvetica Neue',
                                          sans-serif;
                                        color: rgb(72, 84, 93);
                                      "
                                    >
                                      You just received ${data.amount} ${data.currency} ($${data.amountinusd}
                                      USD) from an external Bitcoin account. It
                                      may take up to 3 network confirmations
                                      before your Bitcoin is available to trade.
                                    </span>
                                  </td>
                                </tr>

                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    height="30"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  ></td>
                                </tr>
                                <tr
                                  style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                      'Droid Sans', 'Helvetica Neue', sans-serif;
                                  "
                                >
                                  <td
                                    valign="top"
                                    width="48%"
                                    align="center"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                        'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                    "
                                  >
                                    <a
                                      href="https://www.coinbase.com/accounts/1f888cc0-6d6f-560a-a970-9565b7580a57/transactions/f7034d1e-222e-5e7c-ab04-7d1d03095417"
                                      style="
                                        display: block;
                                        padding: 15px 25px;
                                        border-radius: 3px;
                                        text-decoration: none;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Oxygen, Ubuntu, Cantarell, 'Fira Sans',
                                          'Droid Sans', 'Helvetica Neue',
                                          sans-serif;
                                        background-color: rgb(0, 130, 202);
                                        color: rgb(255, 255, 255);
                                      "
                                      target="_blank"
                                      data-saferedirecturl="https://www.google.com/url?q=https://www.coinbase.com/accounts/1f888cc0-6d6f-560a-a970-9565b7580a57/transactions/f7034d1e-222e-5e7c-ab04-7d1d03095417&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw1yDzsKGZoBh5FZ-OO44zZI"
                                      >Sign in to view transaction</a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td height="40"></td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      id="m_-7855582218577409860m_7414801112868001118promo"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-top: 20px"
                    >
                      <tbody>
                        <tr>
                          <td colspan="2" height="20"></td>
                        </tr>
                        <tr>
                          <td colspan="2" align="center">
                            <span
                              style="
                                font-size: 14px;
                                font-weight: 400;
                                margin-bottom: 10px;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                                color: rgb(254, 254, 254);
                              "
                              >Get the latest Coinbase App for your phone</span
                            >
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" height="20"></td>
                        </tr>
                        <tr>
                          <td valign="top" width="50%" align="right">
                            <a
                              href="https://control.kochava.com/v1/cpi/click?campaign_id=kocoinbase-ios552533b683779d4454e56c90a0&amp;network_id=2426&amp;device_id=device_id&amp;site_id=1"
                              style="display: inline-block; margin-right: 10px"
                              target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://control.kochava.com/v1/cpi/click?campaign_id%3Dkocoinbase-ios552533b683779d4454e56c90a0%26network_id%3D2426%26device_id%3Ddevice_id%26site_id%3D1&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw1Z4c5ugmqju4fWGA-ye3RQ"
                            >
                              <img
                                src="https://ci3.googleusercontent.com/meips/ADKq_Nbld4Z1UMMr-hF-rQbHkfljk_W7Ko9qENo3QtsBr4zB24SWW1EfjdWn5cUI7fEgNz_uHPowec9HgSaO3DrXifalb6aTMtAjZC9nZ7GcQ5yTDybx-w=s0-d-e1-ft#https://s3.amazonaws.com/app-public/Coinbase-email/iOS_app.png"
                                height="40"
                                border="0"
                                alt="Coinbase iOS mobile bitcoin wallet"
                                class="CToWUd"
                                data-bit="iit"
                              />
                            </a>
                          </td>
                          <td valign="top">
                            <a
                              href="https://control.kochava.com/v1/cpi/click?campaign_id=kocoinbase----production553ec3be25c1308daf2a5d2791&amp;network_id=2426&amp;device_id=device_id&amp;site_id=1&amp;append_app_conv_trk_params=1"
                              style="display: inline-block; margin-left: 5px"
                              target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://control.kochava.com/v1/cpi/click?campaign_id%3Dkocoinbase----production553ec3be25c1308daf2a5d2791%26network_id%3D2426%26device_id%3Ddevice_id%26site_id%3D1%26append_app_conv_trk_params%3D1&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw3SZUPVVUC8vHrZduTk8VLX"
                            >
                              <img
                                src="https://ci3.googleusercontent.com/meips/ADKq_NZx1HA_1fV20v1EgKQdu7IWY7eR6unGZZegT5mgWq1MarZNqSGY_VSugXMSTV4csfSsNfvQtQIR_YM-lbaejVINl_5SSYWxv4UkhxNPZuGkxxqKGxsaIm0=s0-d-e1-ft#https://s3.amazonaws.com/app-public/Coinbase-email/Android_app.png"
                                height="40"
                                border="0"
                                alt="Coinbase Android mobile bitcoin wallet"
                                class="CToWUd"
                                data-bit="iit"
                              />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" height="20"></td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td height="10">&nbsp;</td>
                        </tr>
                        <tr>
                          <td valign="top" align="center">
                            <span
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                                font-size: 10px;
                                margin-bottom: 5px;
                                display: block;
                                color: rgb(254, 254, 254);
                              "
                            >
                              To stop receiving these emails,
                              <a
                                href="https://www.coinbase.com/unsubscribe?data=BAh7BzoMdXNlcl9pZFU6E0JTT046Ok9iamVjdElkIhFabCT3Nw1JApg%2FwPk6FXVuc3Vic2NyaWJlX3R5cGU6EnNlbmRfY3VycmVuY3k%3D--89d0681a65db6d24a7d1ef04d6f74d6b44ac81b9"
                                style="
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Oxygen, Ubuntu,
                                    Cantarell, 'Fira Sans', 'Droid Sans',
                                    'Helvetica Neue', sans-serif;
                                  color: rgb(254, 254, 254);
                                "
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.coinbase.com/unsubscribe?data%3DBAh7BzoMdXNlcl9pZFU6E0JTT046Ok9iamVjdElkIhFabCT3Nw1JApg%252FwPk6FXVuc3Vic2NyaWJlX3R5cGU6EnNlbmRfY3VycmVuY3k%253D--89d0681a65db6d24a7d1ef04d6f74d6b44ac81b9&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw1cgL3HL8LBWE0KjAttlQQY"
                                >unsubscribe from this list</a
                              >.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td height="10"></td>
                        </tr>
                        <tr>
                          <td valign="top" align="center">
                            <span
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                                font-size: 10px;
                                margin-bottom: 5px;
                                display: block;
                                color: rgb(254, 254, 254);
                              "
                            >
                              <a
                                href="https://www.coinbase.com/legal/user_agreement?country=NG"
                                style="
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Oxygen, Ubuntu,
                                    Cantarell, 'Fira Sans', 'Droid Sans',
                                    'Helvetica Neue', sans-serif;
                                  font-size: 10px;
                                  margin-bottom: 5px;
                                  display: block;
                                  text-decoration: underline;
                                  color: rgb(254, 254, 254);
                                "
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.coinbase.com/legal/user_agreement?country%3DNG&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw1K82FQ2nuPBCQmsJA1osn9"
                                >Terms of Service</a
                              >
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" align="center">
                            <span
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                                font-size: 10px;
                                color: rgb(254, 254, 254);
                              "
                              >©
                              <a
                                href="https://www.coinbase.com/"
                                style="
                                  text-decoration: none;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Oxygen, Ubuntu,
                                    Cantarell, 'Fira Sans', 'Droid Sans',
                                    'Helvetica Neue', sans-serif;
                                  color: rgb(254, 254, 254);
                                "
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.coinbase.com/&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw2AXj69r6CNqK7bX8H9YScT"
                                >Coinbase</a
                              >
                              2022
                            </span>
                            <br />
                            <span
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                                font-size: 10px;
                                color: rgb(254, 254, 254);
                              "
                            >
                              Coinbase Europe Limited
                            </span>
                            <br />
                            <span
                              style="
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                                  'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                  sans-serif;
                                font-size: 10px;
                                color: rgb(254, 254, 254);
                              "
                            >
                              <a
                                href="https://www.google.com/maps/search/70+Sir+John+Rogerson's+Quay++%7C++Dublin?entry=gmail&amp;source=g"
                                style="
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Oxygen, Ubuntu,
                                    Cantarell, 'Fira Sans', 'Droid Sans',
                                    'Helvetica Neue', sans-serif;
                                "
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.google.com/maps/search/70%2BSir%2BJohn%2BRogerson's%2BQuay%2B%2B%257C%2B%2BDublin?entry%3Dgmail%26source%3Dg&amp;source=gmail&amp;ust=1729215235403000&amp;usg=AOvVaw04aellXUGuh6uVBgEJ78GB"
                                >70 Sir John Rogerson's Quay | Dublin</a
                              >
                              2 | D02 R296 | Ireland
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td height="50">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

  await sendMail(email, subject, html, from);
  return true;
}

// BINANCE MESSAGES




export async function binanceMessage(data){

const subject = `[Binance] ${data.subject} - ${nyTime}`
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <div style="background-color:#efefef"><div class="adM">
      </div><div style="margin:0px auto;max-width:600px"><div class="adM">
      </div><table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
      <div style="margin:0px auto;max-width:600px">
      <table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
      <div class="m_-6132439475154048755mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="font-size:0px;padding:0;word-break:break-word" align="center">
      <table style="min-width:100%;max-width:100%;border-collapse:collapse;border-spacing:0px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td><img style="border:0;display:block;outline:none;text-decoration:none;height:auto;min-width:100%;width:100%;max-width:100%;font-size:13px" src="https://ci3.googleusercontent.com/meips/ADKq_NYhjgGN9V6g8u6puyYp_wcUvP43ivhbvfr07_8PjQpdfZWy2H77hNW_cqOkBqgtspBBkJxUkNhWGb34yL5ICY_tQMhlQJxGJDy0FWM0IPwNubmYFpMY01kXuqnS38Y2Epgf4_oJPxqCQ2Fefs3e=s0-d-e1-ft#https://public.bnbstatic.com/image/ufo/20210831/1e00bd49-0695-4eaa-8ab0-6dd89a7087fb.png" width="auto" height="auto" class="CToWUd" data-bit="iit"></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
      <table style="background:#ffffff;background-color:#ffffff;width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:5px 5px 5px 5px;text-align:center">
      <div style="margin:0px auto;max-width:590px">
      <table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:5px 5px 5px 5px;text-align:center">
      <div class="m_-6132439475154048755mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 10px 5px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:20px;font-weight:900;line-height:25px;text-align:left;color:#000000">${data.subject}&nbsp;</div>
      </td>
      </tr>
      <tr>
      <td dir="ltr" style="background:#ffffff;font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:14px;line-height:20px;text-align:left;color:#000000">Dear Binancian, <br><br>${data.text}<br><br>Yours sincerely, <br>Binance</div>
      </td>
      </tr>
      <tr>
      <td style="font-size:0px;padding:10px 5px 10px 5px;word-break:break-word" align="left">
      <table style="border-collapse:separate;line-height:100%" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <!-- <tr>
      <td style="border:none;border-radius:3px;background:#fcd535" role="presentation" align="center" valign="middle" bgcolor="#FCD535">V<a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen%2Fmy%2Fsecurity/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/3huPFn2a9TymmANFSwqrlEpGyRk=146" rel="noopener" style="display:inline-block;background:#fcd535;color:#000000;font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:14px;font-weight:900;line-height:15px;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;border-radius:3px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen%252Fmy%252Fsecurity/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/3huPFn2a9TymmANFSwqrlEpGyRk%3D146&amp;source=gmail&amp;ust=1729588191445000&amp;usg=AOvVaw1TZhQeIu7si8OtAdwDWO8c">Visit Security Center</a>V</td>
      </tr> -->
      </tbody>
      </table>
      </td>
      </tr>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:14px;line-height:20px;text-align:left;color:#000000">
      <!-- <div>Don’t recognize this activity? Please&nbsp; <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Faccounts.binance.com%2Fen%2Fuser%2Freset-password%2F1%3Ftype=email/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/LST12SipmpvK_NwsNIbrfl8OUk0=146" style="color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Faccounts.binance.com%252Fen%252Fuser%252Freset-password%252F1%253Ftype%3Demail/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/LST12SipmpvK_NwsNIbrfl8OUk0%3D146&amp;source=gmail&amp;ust=1729588191445000&amp;usg=AOvVaw162uz3zOKywRgZIb96q_qw">reset your password</a>&nbsp;and contact&nbsp; <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen%2Fsupport/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/CK7gOjD6abgZ6CO-t7Zt38oQ2x0=146" style="color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen%252Fsupport/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/CK7gOjD6abgZ6CO-t7Zt38oQ2x0%3D146&amp;source=gmail&amp;ust=1729588191445000&amp;usg=AOvVaw0Hk7QS2s7_fiH7Xf_7s1lN">customer support</a>&nbsp;immediately.&nbsp;</div> -->
      <div>&nbsp;</div>
      <!-- <em>This is an automated message, please do not reply.&nbsp; </em></div> -->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
      <table style="background:#ffffff;background-color:#ffffff;width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:5px 5px 5px 5px;text-align:center">
      <div style="margin:0px auto;max-width:590px">
      <table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0 0 0 0px;padding-bottom:0;padding-right:0;padding-top:0;text-align:center">
      <div class="m_-6132439475154048755mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="font-size:0px;padding:0;word-break:break-word" align="center">
      <p style="border-top:solid 1px #f0b90b;font-size:1px;margin:0px auto;width:100%">&nbsp;</p>
      </td>
      </tr>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="center">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:14px;font-weight:900;line-height:20px;text-align:center;color:#f0b90b">Stay connected!</div>
      </td>
      </tr>
      <tr>
      <td style="font-size:0px;padding:0;word-break:break-word" align="center">
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Ftwitter.com%2Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/qWPVFxM1GhBMMRhlaZe9Hc67aGA=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Ftwitter.com%252Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/qWPVFxM1GhBMMRhlaZe9Hc67aGA%3D146&amp;source=gmail&amp;ust=1729588191445000&amp;usg=AOvVaw1r-GaIUGzJG3pvEsOpBrmT"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_NZHv9iuaFW-KX4sUU668J_4W49UyKGie5XLmLzUrCG7_8ywE4fUSHb9b1tEL5-QXrbxyLj0xU2K0suYtgrD_12OgfyQAOStpTGdoV3eUizU=s0-d-e1-ft#https://public.bnbstatic.com/image/social/twitter-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Ft.me%2FBinanceExchange/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/eBbVEmaPugnXFyDIbPeso7z6pQE=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Ft.me%252FBinanceExchange/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/eBbVEmaPugnXFyDIbPeso7z6pQE%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw3zFn2_b3voI9rR4d3GdixH"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_NaYO0Tqfd40-e3jXlDASpn80iOfjuK_1a5TeLa2-NlTf8zdrdF0AD-Wukod5fytY6UDxz6n9Y993HYxyZwfBHyAkKYJXebA6No75vzgYvyQsA=s0-d-e1-ft#https://public.bnbstatic.com/image/social/telegram-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.facebook.com%2Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/HLpEYVLx0B4mT7wIDPJ-edrrb0s=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.facebook.com%252Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/HLpEYVLx0B4mT7wIDPJ-edrrb0s%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw1XTT2UNIYtkarrTxVINuAo"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_NbGpN0IgqMPGu4NATj5Z3n0pL5Mi13f1cJVbRSykVfmLjtDW_Qw17m_lRha8Pr53b2nrGC2cGcv920cJYhelDe1mo1ILFVtSCKZSkfAOXHeIA=s0-d-e1-ft#https://public.bnbstatic.com/image/social/facebook-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.linkedin.com%2Fcompany%2Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/BFHl6hh43zUAof7iTKSG3q9VOFM=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.linkedin.com%252Fcompany%252Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/BFHl6hh43zUAof7iTKSG3q9VOFM%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw1Wb2WDBqPesrnKVrDFDIe-"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_NZo8w10yjtzD5xzq_0JbVJJVmyewAV2LCps997pqbXmJH7VyRuNcweZNe5zxXUe631WxmybwLPKSB4XsLYDz--OBIq-eiWfrJEkqQzgjuxn0g=s0-d-e1-ft#https://public.bnbstatic.com/image/social/linkedin-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.youtube.com%2Fc%2FBinanceYoutube%2Ffeatured/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/etWJ4QxFLJqHlyNy-guNkNnXnXI=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.youtube.com%252Fc%252FBinanceYoutube%252Ffeatured/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/etWJ4QxFLJqHlyNy-guNkNnXnXI%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw2py8bGPe_YFERkn_n4OrPn"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_Nan91g9J74q5ovdzjIQnjqdm5S2K5UTeYAKNGFTkHWMtlQgpCxDfFnHihxXUIOK_JPZYcWsVX4dM48LVhKLfL7dPbWxboi1vx24Afx67O0c=s0-d-e1-ft#https://public.bnbstatic.com/image/social/youtube-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.reddit.com%2Fr%2Fbinance%2F/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/ts6N2FPkxbMOiEGPzGhghP1CaFo=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.reddit.com%252Fr%252Fbinance%252F/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/ts6N2FPkxbMOiEGPzGhghP1CaFo%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw0uEVYPM9DesdAv00dhIig1"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_Nb9ewjZ_pOSXaBkTLpVTHABmRyFQBcyHvNdBW05nncAC56khNJBQwxcUyD8u08H1JQMT4vQ0u8xhblLP7iDvO1VcsmStVbPZ3bGNu4fbMQ=s0-d-e1-ft#https://public.bnbstatic.com/image/social/reddit-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      
      <table style="float:none;display:inline-table" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="padding:4px;vertical-align:middle">
      <table style="border-radius:3px;width:20px" role="presentation" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:0px 5px;font-size:0;height:20px;vertical-align:middle;width:20px"><a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Finstagram.com%2Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/27AfIYrcpdSgnoMvyVeLm1hFdXo=146" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Finstagram.com%252Fbinance/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/27AfIYrcpdSgnoMvyVeLm1hFdXo%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw0mrzlUEsMBvEUDgCD99SNJ"> <img style="border-radius:3px;display:block" src="https://ci3.googleusercontent.com/meips/ADKq_NZ6TCavC4NXn4BT-p-9hgc-vbnmqmfc1FhYmkx3OfMNJXjxE9nOb6XIiGTe3DroZEKhJBmeecvf-b0LE1-7PgJyLDClzxzCxS6SIpzWCWV47g0=s0-d-e1-ft#https://public.bnbstatic.com/image/social/instagram-dark.png" width="20" height="20" class="CToWUd" data-bit="iit"> </a></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div style="margin:0px auto;max-width:590px">
      <table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
      <div class="m_-6132439475154048755mj-column-per-50" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:10px;line-height:20px;text-align:left;color:#000000"><span id="m_-6132439475154048755ipunt-2">To stay secure, setup your anti-phishing code </span> <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen%2Fmy%2Fsecurity%2Fanti-phishing-code/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/omLPjffeyDO9jrGACUDA0cLLXdE=146" style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen%252Fmy%252Fsecurity%252Fanti-phishing-code/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/omLPjffeyDO9jrGACUDA0cLLXdE%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw12mycQu1Qw3Q4BLhA3k3Y0">here</a></div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div class="m_-6132439475154048755mj-column-per-50" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 11px 5px;padding-bottom:11px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:14px;line-height:20px;text-align:left;color:#000000"></div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div style="margin:0px auto;max-width:590px">
      <table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
      <div class="m_-6132439475154048755mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:11px;line-height:15px;text-align:left;color:#000000">
      <div>
      <div>
      <div><strong>Risk warning:&nbsp; </strong>Digital asset prices can be volatile. The value of your investment may go down or up and you may not get back the amount invested. You are solely responsible for your investment decisions and Binance is not liable for any losses you may incur. Not financial advice. For more information, see our <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen%2Fterms/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/z5zfdHuHVJbunwMJtRCMgXlo3K0=146" style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen%252Fterms/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/z5zfdHuHVJbunwMJtRCMgXlo3K0%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw3KBJBHv5m0YD8XAJM5t9I-">Terms of Use</a> and <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen%2Frisk-warning/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/1axrRlXMs3RSQ9nkCgIRY8EL__4=146" style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen%252Frisk-warning/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/1axrRlXMs3RSQ9nkCgIRY8EL__4%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw1wnb1DpHQyKpxWHNK-Sttx">Risk Warning</a>.</div>
      <div>&nbsp;</div>
      </div>
      <div><strong>Kindly note: </strong>&nbsp;Please be aware of phishing sites and always make sure you are visiting the official Binance.com website when entering sensitive data.</div>
      </div>
      </div>
      </td>
      </tr>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="left">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:11px;line-height:15px;text-align:left;color:#000000">
      <div id="m_-6132439475154048755iqd7v">You have received this email as a registered user of <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/QOvZeUSsbTXNUssEwknAcKk__k0=146" style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/QOvZeUSsbTXNUssEwknAcKk__k0%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw2_t-ARpui1aZLglxTxzmcw">binance.com&nbsp;</a></div>
      <div id="m_-6132439475154048755iyjsq"><span id="m_-6132439475154048755if6dk">For more information about how we process data, please see our </span> <a href="https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%2F%2Fwww.binance.com%2Fen%2Fprivacy/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/2X_kdhXR6a4bKiI52hYgvefxszU=146" style="text-align:inherit;color:#f0b90b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://n342f91h.r.ap-northeast-1.awstrack.me/L0/https:%252F%252Fwww.binance.com%252Fen%252Fprivacy/1/0106018dadf9116b-866aa60f-e6ea-4c89-b21e-ff5e1f7e6930-000000/2X_kdhXR6a4bKiI52hYgvefxszU%3D146&amp;source=gmail&amp;ust=1729588191446000&amp;usg=AOvVaw0qpcVDK_Q6YStSBB4VRBIx">Privacy policy.</a></div>
      </div>
      </td>
      </tr>
      <tr>
      <td style="font-size:0px;padding:0 5px 0 5px;word-break:break-word" align="center">
      <p style="border-top:solid 2px #f0b90b;font-size:1px;margin:0px auto;width:100%">&nbsp;</p>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div style="margin:0px auto;max-width:590px">
      <table style="width:100%" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:5px 5px 5px 5px;text-align:center">
      <div class="m_-6132439475154048755mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
      <table style="vertical-align:top" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td dir="ltr" style="font-size:0px;padding:5px 5px 5px 5px;word-break:break-word" align="center">
      <div style="font-family:BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif;font-size:11px;line-height:15px;text-align:center;color:#000000"><strong>© 2017 - 2024 Binance.com, All Rights Reserved. </strong></div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
  </body>
  </html>`
  const from = "Binance"

await sendMail(data.email, subject, html, from)

  return true
}