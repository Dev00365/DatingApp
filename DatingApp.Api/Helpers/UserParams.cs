namespace DatingApp.Api.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int PageSize = 10;
        public int pageSize
        {
            get { return PageSize; }
            set { PageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        
    }
}