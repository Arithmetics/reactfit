require 'test_helper'

class ContentControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get content_home_url
    assert_response :success
  end

end
