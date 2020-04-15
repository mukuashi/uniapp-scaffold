/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 壁纸集data，后期换到server api维护.
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-03-28 // Initial version.
 * @Date:   2020-03-28 15:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-08 02:44:52
 */
const wallpapers = [
  "https://lz.sinaimg.cn/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-25/w_5e02b44081594/05e02b440816c9.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-22/w_5dfecd711bb5a/05dfecd711bc6b.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-20/w_5dfc9e15050c3/05dfc9e150521e.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-18/w_5df9775238e16/05df9775238fe0.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-15/w_5df5906a6bd94/05df5906a6befb.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-13/w_5df2e36df1c1c/05df2e36df1dc2.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-11/w_5df03f532c12d/05df03f532c285.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-08/w_5dec4ca4a2700/05dec4ca4a2878.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-06/w_5de9a4a416f64/05de9a4a4170a0.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-12-03/w_5de5ad262f86a/05de5ad262fa17.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-11-30/w_5de1b175186eb/05de1b1751890a.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-11-28/w_5ddf8c5da1624/05ddf8c5da1763.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-11-27/w_5dde3a348ec75/05dde3a348ee39.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-11-10/w_5dc7d8b4a60a3/05dc7d8b4a6245.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-11-03/w_5dbe36dce50c6/05dbe36dce5248.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-10-30/w_5db8db2089fab/05db8db208a10f.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-10-23/w_5dafa4fe29767/05dafa4fe298fd.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-10-09/w_5d9d69b4f2acd/05d9d69b53cf12.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-04-18/w_5cb7c14560815/85cb7c145bcc36.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2019-03-07/w_5c80626e09d76/05c80626e0baef.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-20/w_5c1ae1ccd1bf6/05c1ae1ccd375f.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-18/w_5c18bc473ef0f/05c18bc47408ea.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/85c134190627bc.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/75c13419062809.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/65c1341906284d.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-14/w_5c13419019d5b/55c1341906288f.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/85c11a8910230f.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/75c11a89102357.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/65c11a89102397.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/45c11a8910240b.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/35c11a89102444.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/25c11a89102488.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/15c11a891024c3.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/05c11a89102500.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-11-17/w_5bef8f8001db8/05bef8f8003951.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-10-13/w_5bc1a16b3fb75/05bc1a16bc7a6b.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-10-12/w_5bbff091dd37c/05bbff091dd647.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-10-09/w_5bbc094bb330c/05bbc094c143db.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-10-06/w_5bb80b86d3506/05bb80b86d38ab.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-10-04/w_5bb5e9f9c3b29/05bb5e9fa341d0.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-06-22/w_5b2c81bad3a01/05b2c81bad3d2f.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/21/2018-06-15/w_5b23b17e68617/05b23b17e6876f.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/21/2018-06-13/w_5b20782538c3b/05b20782538d78.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-05-18/w_5afe9fc9e7142/85afe9fca55ec6.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-05-18/w_5afe9fc9e7142/05afe9fca5609a.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/85aa72975370bd.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/75aa7297537107.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/55aa7297537183.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/45aa72975371c0.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/35aa72975371ff.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/25aa729753723d.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/15aa729753727f.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/05aa72975372c0.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-01-21/w_5a644f2cd85d2/85a644f2cd8645.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-01-21/w_5a644f2cd85d2/75a644f2cd8970.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/192/38224/a_5a153182a8f1b/05a153182b517d.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/170/38224/a_5978a5019e991/25978a501ac3cd.jpg!1200w.jpg",
  "https://img.pixbe.com/p47810601/E99F449EFCB74E3BA82E8237DCBA54A8_640.jpg",
  "https://img.pixbe.com/p47810601/E8BCC804399741B681F59D78537BA572_640.jpg",
  "https://img.pixbe.com/p47810601/BB381FBF431A489C96419E312E6494F3_640.jpg",
  "https://img.pixbe.com/p47810601/0917F88BF15F414C96C10F243355B06B_640.jpg",
  "https://img.pixbe.com/p47810601/24DB9644BE814AAB9CDD7CFE6D39A002_640.jpg",
  "https://img.pixbe.com/p47810601/3BED16B685964BE197DA960A9B9FC7A5_640.jpg",
  "https://img.pixbe.com/p47810601/8983ADC4EF9243F5B67C2D25A412C55F_640.jpg",
  "https://img.pixbe.com/p47810601/C871C45ED6D74072839B7E9D08E195D6_640.jpg",
  "https://img.pixbe.com/p47810601/3F31DCAAB5A3480997A08BE976B98D87_640.jpg",
  "https://img.pixbe.com/p47810601/E124CB219C59429A82FB9443D28EFF4C_640.jpg",
  "https://img.pixbe.com/p47810601/22C15EC68FB04C7EB7A3F8668F59ED7E_640.jpg",
  "https://img.pixbe.com/p47810601/2D1F75B75E2449C4B8118C5BF478CAD8_640.jpg",
  "https://img.pixbe.com/p47810601/0FEEAE2C60B94448B41843374ED8EF6B_640.jpg",
  "https://img.pixbe.com/p47810601/BF4AB8BEB3E14D10A41F8DF1F7D5DEDE_640.jpg",
  "https://img.pixbe.com/p47810601/06752D905DA340F195FFAF527FEF0DE2_640.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gd46iout75j20vz1kw4qp.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gd46iout75j20vz1kw4qp.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gd1t7cyrr8j216o1kw4qq.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gd0qr7otgyj21421kwx6p.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gczhy2nrurj211x1kwhcu.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gcycxx0lzqj216o1kwx6p.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gcx703kfenj216o1kwb2a.jpg",
  "https://lz.sinaimg.cn/osj1080/967d9727ly3gcvz4zex5lj216o1kwb2a.jpg"
];
export default wallpapers;
