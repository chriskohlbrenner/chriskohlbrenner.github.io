Feature: Manage Articles
  In order to make a blog
  As an author
  I want to create and manage articles
  
  Scenario: Articles List
    Given I have articles titled Caching, Cucumber, Redis
    When I go to the list of articles
    Then I should see "Caching"
    And I should see "Cucumber"
    And I should see "Redis"