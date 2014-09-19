
function Class(thing){
 this.attribute = thing

class Property
    def initialize(units)
        @units = units # Int
    end
    has_many :deeds
    @units # Int
    @deeds # Arr of Deeds
    @owners # Arr 
    @mortgages
    @bbl # 
    has_many :owners, through: :deeds
    has_many :mortgages
    has_many :hpd_violations
    has_many :building_permits

    
    def current_deed
        self.deeds.select{  
    end

    def current_owner
        self.current_deed.owner
    end
    
    def all_owners
        deeds = self.deeds
        
        owners = []
        _.each(deeds, function(deed){
            owners.push(deed.owner)
        })
        
        return _.map(deeds, function(deed){deed.owner})

    end


    PROPERTY_TYPES = [ 'Residential', 'Commerical', 'Condo' ]
    @type # Property::PROPERTY_TYPE
    ZONINGS = [ '' ]
    @zoning # PROPRTY::ZONING
    @floor_area_ratio
    current_deed # output: Deed
    current_owner # output: Owner
end

property.current_deed.owner


class Deed
    
end
class Deed
belongs_to :property
belongs_to :owner
OWNER_TYPES = [ 'Landlord', 'Firm', 'Agency' ]
    @owner_type # Property::OWNER_TYPE
    @date = 
    @current # Boolean
end

class Location
    belongs_to :locatable
    LOCATABLE_TYPES = [ 'Property', 'Office' ]
    @locatable_type # Location::LOCATABLE_TYPE
    @block # Int w/ formatting constraints
    BOROUGHS = [ 'Brooklyn', 'Manhattan', 'Bronx', 'Staten Island', 'Queens' ]
    @borough # Location::BOROUGH
    @street_number # Int w/ formatting constraints
    @street # Str
    @address =  # Str w/ formatting constraints
    @lat = get_lat(@address)# Decimal w/ formatting constraints
    @lon # Decimal w/ formatting constraints
    
    private
    
    def get_lat(address)
        return lat 
    end
end


class Landlord
    @deeds
    @shares
has_many :deeds as: :owner
has_many :shares as: :shareholder
end
class Investor
has_many :shares as: :shareholder
end
class Firm
has_many :properties as: :owner
has_many :shares
has_many :offices, as: :officeable
end
class Office
belongs_to :officeable
has_one :location, as: :locatable
OFFICABLE_TYPES = [ 'Firm', 'Landlord', 'Agency' ]
@officeable_type
end
class Share
belongs_to :shareholder
belongs_to :firms
SHAREHOLDER_TYPES = ['Landlord', 'Investor', 'Manager']
@shareholder_type
end
class Block
has_many :lots
@number
end
class Lot
belongs_to :block
end

    Status
    API
    Training
    Shop
    Blog
    About

    © 2014 GitHub, Inc.
    Terms
    Privacy
    Security
    Contact

