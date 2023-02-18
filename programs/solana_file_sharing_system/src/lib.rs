use anchor_lang::prelude::*;

declare_id!("2sVP5kvLJbSvbNk6abeQjq4VDvd1p3AtMbJvuXVWNsR4");

#[program]
pub mod solana_management_system {
    use super::*;
    pub fn share_docs(ctx:Context<Leaks>,title:String,desc:String,docs:String) -> Result<()> {
        let files : &mut Account<Files> =  &mut ctx.accounts.files;
        files.title = title;
        files.desc = desc;
        files.docs = docs;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Leaks<'info> {
    #[account(init,payer=user,space=64*3)]
    pub files: Account<'info,Files>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info,System>
}

#[account]
pub struct Files{
    pub title : String, 
    pub desc : String,
    pub docs : String,
}
