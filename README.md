<h1 align="center" >Setting up the local environment</h1>

<p align="center">
  <a href="#How to get started"><strong>How to get started</strong></a> ·
  <a href="#Setting up Supabase locally for Edge Functions"><strong>Setting up Supabase locally for Edge Functions</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
</p>
<br/>

## How to get started

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Setting up Supabase locally for Edge Functions

In order to develop [Supabase edge functions](https://supabase.com/dashboard/project/_/functions) locally, a few things need to happen.

1. Install the Supabase CLI tool - [Supabase CLI docs](https://supabase.com/docs/guides/local-development):
   ```bash
   npm install supabase --save-dev
   ```
2. Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/): Follow the link and install there. (Note: if you are on Windows and do not have WSL installed, go to the Microsoft store and install it). Make sure to go to the Settings - General and ensure the following is enabled: Expose daemon on tcp://localhost:2375 without TLS. Once it has a checkmark, click Apply & Restart.
3. Run the [Supabase command ](https://supabase.com/docs/reference/cli/supabase-init):
   ```bash
   npx supabase init
   ```
   If using VSCode, select `y` when prompted to "Generate VS Code settings for Deno?\[y/N\].
4. Install Deno for use in VS Code. [Link for instructions](https://docs.deno.com/runtime/getting_started/setup_your_environment/)
5. Next you need to login ([login docs,](https://supabase.com/docs/reference/cli/supabase-login)) to your Supabase account through the Supabase CLI.
   ```bash
   npx supabase login
   ```
   When asked for login token, go [here](https://supabase.com/dashboard/account/tokens) to get it.
6. Link the local supabase environment to your database by running
   ```bash
   supabase link --project-ref ytjfmlzpqriaxgizkuta
   ```
   Note that if you get a tcp connection error, it's probably because you forgot to change the settings in Docker Desktop. View step 3 again.
7. Start Supabase by running:
   ```bash
   npx supabase start
   ```

After following these steps, the local setup is complete. Here is a link to the [Edge Functions local quickstart guide](https://supabase.com/docs/guides/functions/local-quickstart).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Run locally

Add the following to a .env.local file. The URL and key can be found [here](https://supabase.com/dashboard/project/_/settings/api)

```
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
```

1. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).
