import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return await axios
    .get('https://x.nest.land/api/packages/1') // get minimum number of packages to speed up loading
    .then(({ headers }) => res.status(200).json({ total: headers['x-total'] }))
    .catch(({ data }) => res.status(500).json({ error: true, data }));
}