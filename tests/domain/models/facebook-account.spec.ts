import { FacebookAccount } from '@/domain/models'

describe('FacebookAccount', () => {
  let sut: FacebookAccount
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookId: 'any_fb_id'
  }
  it('should create with Facebook data only ', () => {
    sut = new FacebookAccount(fbData)

    expect(sut).toEqual({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should update name if its empty', () => {
    const accountData = {
      id: 'any_id'
    }
    sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should not update name if its not empty', () => {
    const accountData = {
      id: 'any_id',
      name: 'any_name'
    }
    sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })
})
