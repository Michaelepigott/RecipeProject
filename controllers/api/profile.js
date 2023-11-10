// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//     try {
//       console.log(req.session.user_id)
//       // Find the logged in user based on the session ID
//       const userData = await User.findByPk(req.session.user_id, 
//         // {
//         // attributes: { exclude: ['password'] },
//         // include: [{ model: Recipe }],
//       // }
//       );
  
//       const user = userData.get({ plain: true });
//   console.log(user)
//       res.render('profile', {
//         ...user,
//         logged_in: true
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/profile', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//       res.redirect('/profile');
//       return;
//     }
  
//     res.render('profile');
//   });