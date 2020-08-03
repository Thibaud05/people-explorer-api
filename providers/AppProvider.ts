import { IocContract } from '@adonisjs/fold'
import PeopleExtractorService from 'App/Services/PeopleExtractorService'
import PeopleDataAccessService from 'App/Services/PeopleDataAccessService'

export default class AppProvider {
  constructor (protected $container: IocContract) {
  }

  public register () {
    // Register your own bindings
  }

  public boot () {
    this.$container.singleton('App/Services/PeopleExtractor', () => new PeopleExtractorService())
    this.$container.singleton('App/Services/PeopleDataAccess', () => new PeopleDataAccessService())
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public ready () {
    // App is ready
  }
}
