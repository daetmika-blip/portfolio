# Mikaella C. Daet - portfolio

Plain HTML, CSS and JavaScript. No build step, no installs. Open it in VS Code and run it with Live Server.

## what's in the folders

```
index.html          the main page
admin/              the admin page (login, messages, add files/link/cv, projects)
assets/images/      logo.svg and a placeholder photo (avatar.svg)
css/                styles, main.css pulls in the rest
js/
  config.js         supabase keys go here
  content.js        her text, skills, links, photo
  core/ services/ visuals/ ui/ sections/    the code, one small file per job
  main.js           starts everything
database/setup.sql  paste this into supabase once
```

## to see it

1. open the folder in VS Code
2. install the "Live Server" extension
3. right click `index.html` and pick "Open with Live Server"

It works like this with nothing set up. There just won't be any projects, and the contact form and admin won't work until supabase is connected.

## make it hers (js/content.js)

- `bio`, `heroText`, `roles`: what she says about herself
- `SKILLS`: sample skills right now, change them to what she actually knows
- `socials`: paste her links between the quotes, empty ones stay hidden
- `photo`: put her picture in `assets/images/` and write its path

Her name is also in `index.html` (search for `Mikaella`) and `js/config.js`. The logo is `assets/images/logo.svg`. Colors are in `css/base/variables.css`, the main pink is `--a1`.

## connect supabase (free) so the admin works

1. make an account at supabase.com and create a new project
2. open the SQL Editor, then open `database/setup.sql` in VS Code. Change `PUT-YOUR-ADMIN-EMAIL-HERE` to her email, copy everything, paste it in the editor and press Run
3. go to Authentication > Users > Add user. Use the same email, set a password and tick auto-confirm
4. Authentication > Sign In / Providers: turn off "Allow new users to sign up"
5. Project Settings > API Keys: copy the project URL and the publishable key into `js/config.js`. Don't use the secret key
6. refresh the site, tap ADMIN in the bottom right corner and log in

Free projects pause after about a week with no visits. If the admin stops working, open the supabase dashboard and press Restore project.

## messages in gmail (optional)

Messages always show up in the admin under Message Logs. If she also wants them in her inbox, get a free key at web3forms.com using her gmail and paste it in `web3formsKey` in `js/config.js`.

## projects

The admin has two categories, Data Analysis and Dashboards. In the database they're still stored as `game` and `website`, that's only an old internal name.

## putting it online

Upload the folder to a GitHub repo, then import the repo on vercel.com (the free Hobby plan is fine). Upload `js/config.js` too, the publishable key is meant to be public.

## who can change things

Only the email in `setup.sql` counts as admin, and the database enforces that. Visitors can read projects and send a message, nothing else.
